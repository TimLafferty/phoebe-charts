import * as d3 from 'd3';
import { renderToSvgString } from '../shared/svgDocument';
import { KpiGoalTrackerRequest } from './schema';

function safeMaxScaleValue(values: Array<number | undefined>): number {
  const finiteValues = values.filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
  const max = finiteValues.length ? Math.max(...finiteValues) : 0;
  return max > 0 ? max : 1;
}

function percent(currentValue: number, goalValue: number): number {
  if (goalValue <= 0) return 0;
  return Math.min(100, Math.round((currentValue / goalValue) * 100));
}

export function renderKpiGoalTrackerSvg(request: KpiGoalTrackerRequest): string {
  const { data, options } = request;

  const barHeight = 20;
  const strokeWidth = 2;
  const rightPadding = 24;

  const width = options.width;
  const height = options.height;

  const effectiveWidth = Math.max(1, width - rightPadding);

  const maxScale = safeMaxScaleValue([data.goalValue, data.paceValue, data.benchmarkValue]);
  const xScale = d3.scaleLinear().domain([0, maxScale]).range([0, effectiveWidth]);

  const progressGradientId = `${options.idPrefix}-progress-gradient`;
  const paceStripesId = `${options.idPrefix}-pace-stripes`;

  return renderToSvgString({
    width,
    height,
    draw: (svg) => {
      svg.selectAll('*').remove();
      svg.attr('role', 'img');
      svg.style('font-family', options.fontFamily);
      svg.style('font-size', `${options.fontSize}px`);

      const defs = svg.append('defs');

      const gradient = defs
        .append('linearGradient')
        .attr('id', progressGradientId)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', options.color);
      gradient.append('stop').attr('offset', '100%').attr('stop-color', options.color);

      const pattern = defs
        .append('pattern')
        .attr('id', paceStripesId)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 8)
        .attr('height', 8)
        .attr('patternTransform', 'rotate(45)');

      pattern.append('rect').attr('width', 4).attr('height', 8).attr('fill', options.color).attr('opacity', 0.25);

      // Background track
      svg
        .append('rect')
        .attr('class', 'track-background')
        .attr('x', 0)
        .attr('y', 2)
        .attr('width', effectiveWidth)
        .attr('height', barHeight)
        .attr('rx', options.roundness)
        .attr('ry', options.roundness)
        .attr('fill', options.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB');

      // Pace indicator (striped area from current to pace)
      if (data.paceValue != null && data.paceValue > data.currentValue) {
        const currentX = xScale(data.currentValue);
        const paceX = xScale(data.paceValue);

        svg
          .append('rect')
          .attr('class', 'track-pace')
          .attr('x', currentX)
          .attr('y', 2)
          .attr('width', Math.max(0, paceX - currentX))
          .attr('height', barHeight)
          .attr('fill', `url(#${paceStripesId})`)
          .attr('opacity', 1);
      }

      // Progress fill
      const progressWidth = xScale(data.currentValue);
      svg
        .append('rect')
        .attr('class', 'track-progress')
        .attr('x', 0)
        .attr('y', 2)
        .attr('width', Math.max(0, progressWidth))
        .attr('height', barHeight)
        .attr('rx', options.roundness)
        .attr('ry', options.roundness)
        .attr('fill', `url(#${progressGradientId})`);

      // Markers
      const markersGroup = svg.append('g').attr('class', 'markers-container');
      const goalX = Math.min(xScale(data.goalValue), effectiveWidth);
      const labelColor = options.theme === 'dark' ? '#9CA3AF' : '#374151';

      const markerGroup = markersGroup
        .append('g')
        .attr('class', 'marker-group')
        .attr('transform', `translate(${goalX}, 0)`);

      markerGroup
        .append('text')
        .attr('class', 'marker-percentage')
        .attr('x', 0)
        .attr('y', -6)
        .attr('text-anchor', 'middle')
        .attr('fill', labelColor)
        .attr('font-size', '11px')
        .attr('font-weight', '500')
        .text(`${percent(data.currentValue, data.goalValue)}%`);

      if (data.paceValue != null && data.paceValue > data.goalValue) {
        markerGroup
          .append('line')
          .attr('class', 'goal-marker-line')
          .attr('x1', 0)
          .attr('y1', 2)
          .attr('x2', 0)
          .attr('y2', 2 + barHeight + 2)
          .attr('stroke', labelColor)
          .attr('stroke-width', 2)
          .attr('stroke-linecap', 'round')
          .attr('opacity', 0.5);

        markerGroup
          .append('text')
          .attr('class', 'goal-marker-label')
          .attr('x', 0)
          .attr('y', 2 + barHeight + 2 + 10)
          .attr('text-anchor', 'middle')
          .attr('fill', labelColor)
          .attr('font-size', '8px')
          .attr('font-weight', '400')
          .text('GOAL');

        if (data.goalValue > 0) {
          const paceX = xScale(data.paceValue);
          const overPercentage = Math.round(((data.paceValue - data.goalValue) / data.goalValue) * 100);

          markersGroup
            .append('text')
            .attr('class', 'pace-over-label')
            .attr('x', paceX + 2)
            .attr('y', 2 + barHeight / 2 + 4)
            .attr('text-anchor', 'start')
            .attr('fill', options.color)
            .attr('font-size', '8px')
            .attr('font-weight', '400')
            .text(`+${overPercentage}%`);
        }
      }

      // Ticks
      const ticksGroup = svg.append('g').attr('class', 'ticks-container');
      const tickPositions = [0.25, 0.5, 0.75, 0.9];
      const tickExtendIntoBar = (barHeight - strokeWidth) / 4;
      const tickExtendBelow = 4;
      const tickStartY = 2 + barHeight - tickExtendIntoBar;
      const tickEndY = 2 + barHeight + tickExtendBelow;

      const tickLabelColor = options.theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)';

      tickPositions.forEach((pos) => {
        const x = xScale(data.goalValue * pos);
        const label = `${Math.round(pos * 100)}%`;

        ticksGroup
          .append('line')
          .attr('class', 'tick-mark')
          .attr('x1', x)
          .attr('y1', tickStartY)
          .attr('x2', x)
          .attr('y2', tickEndY)
          .attr('stroke', 'rgba(255, 255, 255, 0.75)')
          .attr('stroke-width', 2)
          .attr('stroke-linecap', 'round');

        ticksGroup
          .append('text')
          .attr('class', 'tick-label')
          .attr('x', x)
          .attr('y', tickEndY + 8)
          .attr('text-anchor', 'middle')
          .attr('fill', tickLabelColor)
          .attr('font-size', '8px')
          .attr('font-weight', '400')
          .text(label);
      });
    },
  });
}

