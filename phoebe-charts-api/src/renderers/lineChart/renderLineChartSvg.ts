import * as d3 from 'd3';
import { DEFAULT_MARGINS } from '../shared/types';
import { renderToSvgString } from '../shared/svgDocument';
import { LineChartRequest } from './schema';

function padIfCollapsed([min, max]: [number, number]): [number, number] {
  if (min === max) return [min - 1, max + 1];
  return [min, max];
}

function polylineLength(
  data: Array<{ x: number; y: number }>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>
): number {
  let length = 0;
  for (let index = 1; index < data.length; index += 1) {
    const previous = data[index - 1];
    const current = data[index];
    length += Math.hypot(xScale(current.x) - xScale(previous.x), yScale(current.y) - yScale(previous.y));
  }
  return Math.max(1, length);
}

export function renderLineChartSvg(request: LineChartRequest): string {
  const options = request.options ?? {};
  const dimensions = options.dimensions ?? {};
  const hasExplicitWidth = options.width != null || dimensions.width != null;
  const hasExplicitHeight = options.height != null || dimensions.height != null;

  let width = options.width ?? dimensions.width ?? 600;
  let height = options.height ?? dimensions.height ?? 400;

  if (dimensions.minWidth != null) width = Math.max(width, dimensions.minWidth);
  if (dimensions.maxWidth != null) width = Math.min(width, dimensions.maxWidth);
  if (dimensions.minHeight != null) height = Math.max(height, dimensions.minHeight);
  if (dimensions.maxHeight != null) height = Math.min(height, dimensions.maxHeight);

  if (dimensions.maintainAspectRatio && dimensions.aspectRatio != null) {
    if (hasExplicitWidth && !hasExplicitHeight) {
      height = Math.round(width / dimensions.aspectRatio);
    } else if (!hasExplicitWidth && hasExplicitHeight) {
      width = Math.round(height * dimensions.aspectRatio);
    }
  }

  const margins = options.margins ?? dimensions.margins ?? DEFAULT_MARGINS;

  return renderToSvgString({
    width,
    height,
    draw: (svg) => {
      svg.selectAll('*').remove();
      svg.attr('role', 'img');
      svg.style('font-family', options.fontFamily);
      svg.style('font-size', `${options.fontSize}px`);

      const innerWidth = Math.max(1, width - margins.left - margins.right);
      const innerHeight = Math.max(1, height - margins.top - margins.bottom);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

      const xExtent = d3.extent(request.data, (d) => d.x) as [number, number];
      const yExtent = d3.extent(request.data, (d) => d.y) as [number, number];

      const xDomain = padIfCollapsed(xExtent);
      const yDomain = padIfCollapsed([yExtent[0] * 0.9, yExtent[1] * 1.1]);

      const xScale = d3.scaleLinear().domain(xDomain).range([0, innerWidth]);
      const yScale = d3.scaleLinear().domain(yDomain).range([innerHeight, 0]);

      if (options.showGrid ?? true) {
        g.append('g')
          .attr('class', 'grid grid-y')
          .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => ''))
          .selectAll('line')
          .attr('stroke', '#e5e7eb')
          .attr('stroke-opacity', 0.7);

        g.append('g')
          .attr('class', 'grid grid-x')
          .attr('transform', `translate(0,${innerHeight})`)
          .call(d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => ''))
          .selectAll('line')
          .attr('stroke', '#e5e7eb')
          .attr('stroke-opacity', 0.7);

        g.selectAll('.grid .domain').remove();
      }

      g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));
      g.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

      if (options.xAxisLabel) {
        g.append('text')
          .attr('class', 'x-axis-label')
          .attr('x', innerWidth / 2)
          .attr('y', innerHeight + margins.bottom - 5)
          .attr('text-anchor', 'middle')
          .text(options.xAxisLabel);
      }

      if (options.yAxisLabel) {
        g.append('text')
          .attr('class', 'y-axis-label')
          .attr('transform', 'rotate(-90)')
          .attr('x', -innerHeight / 2)
          .attr('y', -margins.left + 15)
          .attr('text-anchor', 'middle')
          .text(options.yAxisLabel);
      }

      const line = d3
        .line<{ x: number; y: number }>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX);

      const path = g
        .append('path')
        .datum(request.data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', options.lineColor)
        .attr('stroke-width', options.strokeWidth)
        .attr('d', line);

      if (options.animate) {
        const totalLength = polylineLength(request.data, xScale, yScale);

        svg.append('style').text(`
@keyframes phoebe-line-draw { to { stroke-dashoffset: 0; } }
@keyframes phoebe-line-dots { to { opacity: 1; } }
.line { stroke-dasharray: ${totalLength} ${totalLength}; stroke-dashoffset: ${totalLength}; animation: phoebe-line-draw 1000ms linear forwards; }
.dot { opacity: 0; animation: phoebe-line-dots 300ms ease forwards; animation-delay: 1000ms; }
        `);
      }

      if (options.showPoints ?? true) {
        g.selectAll('.dot')
          .data(request.data)
          .enter()
          .append('circle')
          .attr('class', 'dot')
          .attr('cx', (d) => xScale(d.x))
          .attr('cy', (d) => yScale(d.y))
          .attr('r', options.pointRadius)
          .attr('fill', options.lineColor);
      }
    },
  });
}
