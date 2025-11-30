import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import {
  ChartDimensions,
  ChartMargins,
  DEFAULT_CHART_DIMENSIONS,
  DEFAULT_MARGINS,
} from '../../../../models/chart-utilities/chart-dimensions.model';

@Component({
  selector: 'phoebe-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chart', { static: true }) chartElement!: ElementRef<SVGSVGElement>;
  @ViewChild('chartContainer', { static: true }) containerElement!: ElementRef<HTMLDivElement>;

  @Input() data: any[] = [];
  @Input() dimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;
  @Input() xAxisLabel?: string;
  @Input() yAxisLabel?: string;
  @Input() showGrid = true;
  @Input() animate = true;
  @Input() lineColor = '#3b82f6';
  @Input() strokeWidth = 2;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private resizeObserver?: ResizeObserver;

  ngOnInit(): void {
    this.initChart();
    this.setupResizeObserver();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['dimensions']) && this.svg) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private initChart(): void {
    this.svg = d3.select(this.chartElement.nativeElement);
    this.updateChart();
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateChart();
    });
    this.resizeObserver.observe(this.containerElement.nativeElement);
  }

  private updateChart(): void {
    if (!this.data || this.data.length === 0) {
      this.svg.selectAll('*').remove();
      return;
    }

    const containerRect = this.containerElement.nativeElement.getBoundingClientRect();
    const width = this.dimensions.width || containerRect.width || 600;
    const height = this.dimensions.height || containerRect.height || 400;
    const margins = this.dimensions.margins || DEFAULT_MARGINS;

    const innerWidth = width - margins.left - margins.right;
    const innerHeight = height - margins.top - margins.bottom;

    // Clear previous content
    this.svg.selectAll('*').remove();

    // Set SVG dimensions
    this.svg.attr('width', width).attr('height', height);

    // Create main group
    const g = this.svg
      .append('g')
      .attr('transform', `translate(${margins.left},${margins.top})`);

    // Create scales
    const xExtent = d3.extent(this.data, (d) => d.x as number) as [number, number];
    const yExtent = d3.extent(this.data, (d) => d.y) as [number, number];

    const xScale = d3.scaleLinear().domain(xExtent).range([0, innerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([yExtent[0] * 0.9, yExtent[1] * 1.1])
      .range([innerHeight, 0]);

    // Add grid if enabled
    if (this.showGrid) {
      this.addGrid(g, xScale, yScale, innerWidth, innerHeight);
    }

    // Add axes
    this.addAxes(g, xScale, yScale, innerHeight);

    // Add axis labels
    if (this.xAxisLabel) {
      g.append('text')
        .attr('class', 'x-axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + margins.bottom - 5)
        .attr('text-anchor', 'middle')
        .text(this.xAxisLabel);
    }

    if (this.yAxisLabel) {
      g.append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -margins.left + 15)
        .attr('text-anchor', 'middle')
        .text(this.yAxisLabel);
    }

    // Create line generator
    const line = d3
      .line<any>()
      .x((d) => xScale(d.x as number))
      .y((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);

    // Add the line path
    const path = g
      .append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', this.lineColor)
      .attr('stroke-width', this.strokeWidth)
      .attr('d', line);

    // Animate line drawing
    if (this.animate) {
      const totalLength = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Add data points
    g.selectAll('.dot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.x as number))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 4)
      .attr('fill', this.lineColor)
      .attr('opacity', 0)
      .transition()
      .delay(this.animate ? 1000 : 0)
      .duration(300)
      .attr('opacity', 1);
  }

  private addGrid(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number
  ): void {
    // Horizontal grid lines
    g.append('g')
      .attr('class', 'grid grid-y')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-width)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-opacity', 0.7);

    // Vertical grid lines
    g.append('g')
      .attr('class', 'grid grid-x')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-opacity', 0.7);

    // Remove domain lines from grid
    g.selectAll('.grid .domain').remove();
  }

  private addAxes(
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    height: number
  ): void {
    // X axis
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    // Y axis
    g.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));
  }
}
