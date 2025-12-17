import * as d3 from 'd3';
import { DEFAULT_MARGINS } from '../shared/types';
import { renderToSvgString } from '../shared/svgDocument';
import { HeatmapRequest } from './schema';

function extentOrDefault(values: number[]): [number, number] {
  const extent = d3.extent(values) as [number | undefined, number | undefined];
  const min = extent[0] ?? 0;
  const max = extent[1] ?? 1;
  if (min === max) return [min - 1, max + 1];
  return [min, max];
}

export function renderHeatmapSvg(request: HeatmapRequest): string {
  const options = request.options ?? {};
  const width = options.width ?? 800;
  const height = options.height ?? 500;
  const margins = options.margins ?? { ...DEFAULT_MARGINS, bottom: 80, left: 80, right: 20 };

  return renderToSvgString({
    width,
    height,
    draw: (svg) => {
      svg.selectAll('*').remove();
      svg.attr('role', 'img');
      svg.style('font-family', options.fontFamily ?? 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif');
      svg.style('font-size', `${options.fontSize ?? 12}px`);

      const innerWidth = Math.max(1, width - margins.left - margins.right);
      const innerHeight = Math.max(1, height - margins.top - margins.bottom);

      const g = svg
        .append('g')
        .attr('transform', `translate(${margins.left},${margins.top})`);

      const xScale = d3
        .scaleBand<string>()
        .domain(request.data.columns)
        .range([0, innerWidth])
        .padding(options.cellPadding ?? 0.05);

      const yScale = d3
        .scaleBand<string>()
        .domain(request.data.rows)
        .range([0, innerHeight])
        .padding(options.cellPadding ?? 0.05);

      const numericValues = request.data.cells
        .map((c) => c.value)
        .filter((v): v is number => typeof v === 'number' && Number.isFinite(v));

      const valueDomain = extentOrDefault(numericValues);

      const color = d3
        .scaleSequential(d3.interpolateRgb(options.minColor ?? '#1A5F9C', options.maxColor ?? '#FF6B6B'))
        .domain(valueDomain);

      g.selectAll('rect.cell')
        .data(request.data.cells, (d: any) => `${d.row}__${d.column}`)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('x', (d) => xScale(d.column) ?? 0)
        .attr('y', (d) => yScale(d.row) ?? 0)
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('rx', 2)
        .attr('ry', 2)
        .attr('fill', (d) => (d.value === null ? options.nullColor ?? '#cbd5e1' : color(d.value)));

      const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(6);
      const yAxis = d3.axisLeft(yScale).tickSize(0).tickPadding(6);

      const gx = g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${innerHeight})`).call(xAxis);
      gx.select('.domain').remove();

      if (options.rotateXLabels ?? true) {
        gx.selectAll('text')
          .attr('text-anchor', 'end')
          .attr('transform', 'rotate(-35)')
          .attr('dx', '-0.4em')
          .attr('dy', '0.2em');
      }

      const gy = g.append('g').attr('class', 'y-axis').call(yAxis);
      gy.select('.domain').remove();
    },
  });
}

