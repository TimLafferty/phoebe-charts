import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

export type GoalStatus = 'on-track' | 'at-risk' | 'behind' | 'achieved';


@Component({
  selector: 'phoebe-kpi-goal-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-goal-tracker.component.html',
  styleUrls: ['./kpi-goal-tracker.component.scss'],
})
export class KpiGoalTrackerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('progressChart', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input() title: string = '';
  @Input() currentValue: number = 0;
  @Input() goalValue: number = 100;
  @Input() paceValue?: number;
  @Input() paceLabel: string = 'Pace';
  @Input() benchmarkValue?: number;
  @Input() benchmarkLabel: string = 'Prev. Period';
  @Input() unit?: string;
  @Input() startDate?: string;
  @Input() endDate?: string;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() roundness: number = 2

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private resizeObserver?: ResizeObserver;
  private readonly barHeight = 20;
  private readonly strokeWidth = 2;
  private readonly markerHeight = 0; //this.barHeight + (this.strokeWidth * 2);
  private readonly rightPadding = 24; // Space for goal marker label

  ngAfterViewInit(): void {
    this.createChart();
    this.setupResizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.svg &&
      (changes['currentValue'] ||
        changes['goalValue'] ||
        changes['paceValue'] ||
        changes['benchmarkValue'] ||
        changes['theme'])
    ) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  get percentage(): number {
    if (this.goalValue === 0) return 0;
    return Math.min(100, Math.round((this.currentValue / this.goalValue) * 100));
  }

  get remaining(): number {
    return Math.max(0, this.goalValue - this.currentValue);
  }

  get status(): GoalStatus {
    if (this.percentage >= 100) return 'achieved';
    if (this.percentage >= 75) return 'on-track';
    if (this.percentage >= 50) return 'at-risk';
    return 'behind';
  }

  get statusLabel(): string {
    switch (this.status) {
      case 'achieved':
        return 'Achieved';
      case 'on-track':
        return 'On Track';
      case 'at-risk':
        return 'At Risk';
      case 'behind':
        return 'Behind';
    }
  }

  get statusIcon(): string {
    switch (this.status) {
      case 'achieved':
        return 'fa-solid fa-circle-check';
      case 'on-track':
        return 'fa-solid fa-check';
      case 'at-risk':
        return 'fa-solid fa-triangle-exclamation';
      case 'behind':
        return 'fa-solid fa-circle-xmark';
    }
  }

  get formattedCurrent(): string {
    return this.formatValue(this.currentValue);
  }

  get formattedGoal(): string {
    return this.formatValue(this.goalValue);
  }

  get formattedRemaining(): string {
    const value = this.formatValue(this.remaining);
    return this.unit === '%' ? `${value}%` : value;
  }

  get formattedPace(): string | null {
    return this.paceValue != null ? this.formatValue(this.paceValue) : null;
  }

  get formattedBenchmark(): string | null {
    return this.benchmarkValue != null ? this.formatValue(this.benchmarkValue) : null;
  }

  get pacePercentage(): number | null {
    if (this.paceValue == null || this.goalValue === 0) return null;
    return Math.round((this.paceValue / this.goalValue) * 100);
  }

  get paceStatus(): GoalStatus | null {
    if (this.pacePercentage == null) return null;
    if (this.pacePercentage >= 100) return 'achieved';
    if (this.pacePercentage >= 75) return 'on-track';
    if (this.pacePercentage >= 50) return 'at-risk';
    return 'behind';
  }

  get benchmarkPercentage(): number | null {
    if (this.benchmarkValue == null || this.goalValue === 0) return null;
    return Math.round((this.benchmarkValue / this.goalValue) * 100);
  }

  private get statusColor(): string {
    return '#1a5f9c'; // primary color
  }

  private get statusColorLight(): string {
    return '#1a5f9c'; // same as primary - no gradient
  }

  private get maxScaleValue(): number {
    // Determine the max value for the scale - use the max of goal, pace, or benchmark
    const values = [this.goalValue];
    if (this.paceValue != null) {
      values.push(this.paceValue);
    }
    if (this.benchmarkValue != null) {
      values.push(this.benchmarkValue);
    }
    return Math.max(...values);
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateChart();
    });
    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }

  private createChart(): void {
    const container = this.chartContainer.nativeElement;
    const height = this.barHeight + this.markerHeight + 24; // Extra space for labels

    // Clear any existing SVG
    d3.select(container).select('svg').remove();

    this.svg = d3
      .select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height)
      .attr('class', 'goal-tracker__svg');

    // Create gradient definitions
    const defs = this.svg.append('defs');

    // Progress gradient
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'progress-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    gradient.append('stop').attr('offset', '0%').attr('class', 'gradient-start');

    gradient.append('stop').attr('offset', '100%').attr('class', 'gradient-end');

    // Diagonal stripes pattern for pace indicator
    const pattern = defs
      .append('pattern')
      .attr('id', 'pace-stripes')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 8)
      .attr('height', 8)
      .attr('patternTransform', 'rotate(45)');

    pattern
      .append('rect')
      .attr('width', 4)
      .attr('height', 8)
      .attr('class', 'pace-stripe-fill');

    this.updateChart();
  }

  private updateChart(): void {
    if (!this.svg) return;

    const container = this.chartContainer.nativeElement;
    const width = container.clientWidth;

    if (width === 0) return;

    // Update gradient colors
    this.svg.select('.gradient-start').attr('stop-color', this.statusColor);
    this.svg.select('.gradient-end').attr('stop-color', this.statusColorLight);

    // Update pace stripe pattern color (0.25 opacity of status color)
    this.svg.select('.pace-stripe-fill').attr('fill', this.statusColor).attr('opacity', 0.25);

    // Create scale - domain is 0 to max of goal, pace, or benchmark
    // Use rightPadding to leave room for goal marker label
    const maxScale = this.maxScaleValue;
    const effectiveWidth = width - this.rightPadding;
    const xScale = d3.scaleLinear().domain([0, maxScale]).range([0, effectiveWidth]);

    // Background track
    const trackGroup = this.svg.selectAll('.track-group').data([null]);
    const trackGroupEnter = trackGroup.enter().append('g').attr('class', 'track-group');

    trackGroupEnter.append('rect').attr('class', 'track-background');
    trackGroupEnter.append('rect').attr('class', 'track-pace');
    trackGroupEnter.append('rect').attr('class', 'track-progress');

    // Update track background
    this.svg
      .select('.track-background')
      .attr('x', 0)
      .attr('y', 2)
      .attr('width', effectiveWidth)
      .attr('height', this.barHeight)
      .attr('rx', this.roundness)
      .attr('ry', this.roundness)
      .attr('fill', this.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E5E7EB');

    // Update pace indicator (striped area from current to pace)
    if (this.paceValue != null && this.paceValue > this.currentValue) {
      const currentX = xScale(this.currentValue);
      const paceX = xScale(this.paceValue);
      this.svg
        .select('.track-pace')
        .attr('x', currentX)
        .attr('y', 2)
        .attr('width', paceX - currentX)
        .attr('height', this.barHeight)
        .attr('fill', 'url(#pace-stripes)')
        .attr('opacity', 1);
    } else {
      this.svg.select('.track-pace').attr('width', 0);
    }

    // Update progress fill with animation
    const progressWidth = xScale(this.currentValue);
    this.svg
      .select('.track-progress')
      .attr('x', 0)
      .attr('y', 2)
      .attr('height', this.barHeight)
      .attr('rx', this.roundness)
      .attr('ry', this.roundness)
      .attr('fill', 'url(#progress-gradient)')
      .transition()
      .duration(500)
      .ease(d3.easeCubicOut)
      .attr('width', progressWidth);

    // Render markers and ticks
    this.renderMarkers(xScale, effectiveWidth);
    this.renderTicks(xScale);
  }

  private renderMarkers(xScale: d3.ScaleLinear<number, number>, width: number): void {
    // Remove existing markers
    this.svg.selectAll('.markers-container').remove();

    const markersGroup = this.svg.append('g').attr('class', 'markers-container');

    // Goal marker (vertical line at goal value)
    const goalX = Math.min(xScale(this.goalValue), width);
    this.renderGoalMarker(markersGroup, goalX);

    // Pace over goal label at end of bar
    if (this.paceValue != null && this.paceValue > this.goalValue) {
      const paceX = xScale(this.paceValue);
      const overPercentage = Math.round(((this.paceValue - this.goalValue) / this.goalValue) * 100);

      markersGroup
        .append('text')
        .attr('class', 'pace-over-label')
        .attr('x', paceX + 2)
        .attr('y', 2 + this.barHeight / 2 + 4)
        .attr('text-anchor', 'start')
        .attr('fill', this.statusColor)
        .attr('font-size', '8px')
        .attr('font-weight', '400')
        .text(`+${overPercentage}%`);
    }
  }

  private renderGoalMarker(
    group: d3.Selection<SVGGElement, unknown, null, undefined>,
    x: number
  ): void {
    const color = this.theme === 'dark' ? '#9CA3AF' : '#374151';
    const markerGroup = group.append('g').attr('class', 'marker-group').attr('transform', `translate(${x}, 0)`);

    // Percentage label above the marker
    markerGroup
      .append('text')
      .attr('class', 'marker-percentage')
      .attr('x', 0)
      .attr('y', -6)
      .attr('text-anchor', 'middle')
      .attr('fill', color)
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .text(`${this.percentage}%`);

    // Goal marker line (only visible when pace exceeds goal)
    if (this.paceValue != null && this.paceValue > this.goalValue) {
      markerGroup
        .append('line')
        .attr('class', 'goal-marker-line')
        .attr('x1', 0)
        .attr('y1', 2)
        .attr('x2', 0)
        .attr('y2', 2 + this.barHeight + 2)
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0.5);

      markerGroup
        .append('text')
        .attr('class', 'goal-marker-label')
        .attr('x', 0)
        .attr('y', 2 + this.barHeight + 2 + 10)
        .attr('text-anchor', 'middle')
        .attr('fill', color)
        .attr('font-size', '8px')
        .attr('font-weight', '400')
        .text('GOAL');
    }
  }

  private renderTicks(xScale: d3.ScaleLinear<number, number>): void {
    // Remove existing ticks
    this.svg.selectAll('.ticks-container').remove();

    const ticksGroup = this.svg.append('g').attr('class', 'ticks-container');
    const tickPositions = [0.25, 0.5, 0.75, 0.9]; // 25%, 50%, 75%, 90%
    const tickExtendIntoBar = (this.barHeight - this.strokeWidth) / 4;
    const tickExtendBelow = 4;
    const tickStartY = 2 + this.barHeight - tickExtendIntoBar; // Start inside the bar
    const tickEndY = 2 + this.barHeight + tickExtendBelow; // End below the bar

    tickPositions.forEach((pos) => {
      const x = xScale(this.goalValue * pos);
      const label = `${Math.round(pos * 100)}%`;

      // Tick line (white with 0.5 opacity)
      ticksGroup
        .append('line')
        .attr('class', 'tick-mark')
        .attr('x1', x)
        .attr('y1', tickStartY)
        .attr('x2', x)
        .attr('y2', tickEndY)
        .attr('stroke', 'rgba(255, 255, 255, 0.75)')
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')

      // Tick label
      ticksGroup
        .append('text')
        .attr('class', 'tick-label')
        .attr('x', x)
        .attr('y', tickEndY + 8)
        .attr('text-anchor', 'middle')
        .attr('fill', this.theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)')
        .attr('font-size', '8px')
        .attr('font-weight', '400')
        .text(label);
    });
  }

  private formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString();
  }
}
