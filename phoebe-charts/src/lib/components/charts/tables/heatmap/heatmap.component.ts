import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import {
  ChartDimensions,
  DEFAULT_CHART_DIMENSIONS,
  DEFAULT_MARGINS,
} from '../../../../models/chart-dimensions.model';

export interface HeatmapDataPoint {
  row: string;
  column: string;
  value: number | null;
}

export interface HeatmapData {
  rows: string[];
  columns: string[];
  cells: HeatmapDataPoint[];
}

export interface HeatmapCellEvent {
  cell: HeatmapDataPoint;
  rowIndex: number;
  colIndex: number;
  event: MouseEvent;
}

@Component({
  selector: 'phoebe-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss'],
})
export class HeatmapComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chartContainer', { static: true }) containerElement!: ElementRef<HTMLDivElement>;

  primaryColor: string = '#1A5F9C';
  secondaryColor: string = '#FF6B6B';
  neutralColor: string = '#94a3b8';

  svg!: d3.Selection<SVGSVGElement, unknown, null, undefined> | any;
  svgWidth!: number;
  svgHeightRatio: number = 0.75
  svgHeight: number = 0;
  svgMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };
  svgPadding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  } = {
      top: 20,
      right: 20,
      bottom: 25,
      left: 40,
    };

  chartGroup: d3.Selection<SVGGElement, unknown, null, undefined> | any = null;
  chartWidth: number = 0;
  chartHeight: number = 0;

  xAxis: d3.Axis<string> | null = null;
  yAxis: d3.Axis<string> | null = null;

  xScale: d3.ScaleBand<string> = d3.scaleBand<string>() as d3.ScaleBand<string>;
  yScale: d3.ScaleBand<string> = d3.scaleBand<string>() as d3.ScaleBand<string>;
  xDomain: [number | string, number | string] | null = null;
  yDomain: [number | string, number | string] | null = null;

  valueDomain: [number, number] | null = null;
  colorRange: [string, string] | [string, string, string] = [this.primaryColor, this.secondaryColor, this.neutralColor];
  colorScale: d3.ScaleSequential<string> | d3.ScaleDiverging<string> | null = null;

  markPadding: number = 0.025;
  borderColor: string = '#fff';
  borderWidth: number = 1;
  borderRadius: string = '0.25rem';

  // Inputs
  @Input() data: HeatmapData | null = null;
  @Input() dimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;


  ngOnInit(): void {
    console.log('HeatmapComponent initialized', this.data);
    if (this.data && this.data.cells.length) {
      this.valueDomain = this.calculateValueDomain();
      this.setColorScale();
    }
    this.initializeChart();
    this.updateCells();
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('HeatmapComponent data changed', changes);
    if (changes['data'] && !changes['data'].firstChange) {
      // On data change, update scales and re-render
      if (this.data && this.data.cells.length) {
        this.valueDomain = this.calculateValueDomain();
        this.setColorScale();
        this.updateXAxis();
        this.updateYAxis();
        this.updateCells();
      }
    }
  }


  calculateDimensions(): void {
    this.svgWidth = this.containerElement.nativeElement.clientWidth;
    this.svgHeight = this.svgWidth * this.svgHeightRatio;
  }

  calculateValueDomain(): [number, number] {
    const numericValues = this.data!.cells
      .map((d: HeatmapDataPoint) => d.value)
      .filter((v): v is number => v !== null && !isNaN(v));
    const extent = d3.extent(numericValues) as [number, number];
    return extent;
  }


  setColorScale(
    interpolator?: ((t: number) => string),
    range: [string, string] | [string, string, string] = [this.primaryColor, this.secondaryColor]
  ): void {
    // Defensive: compute domain if not already set
    if (!this.valueDomain || !Array.isArray(this.valueDomain) || isNaN(this.valueDomain[0]) || isNaN(this.valueDomain[1])) {
      this.valueDomain = this.calculateValueDomain();
    }

    // Create interpolator from colors if not provided
    const colorInterpolator = interpolator || d3.interpolateRgb(range[0], range[1]);

    // Use d3.scaleSequential for linear color mapping
    this.colorScale = d3.scaleSequential(colorInterpolator)
      .domain(this.valueDomain as [number, number]);
  }

  initializeChart(): void {
    if (!this.data || !this.data.cells.length) {
      console.warn('No data provided to heatmap');
      return;
    }

    this.calculateSVGDimensions();

    // Only create SVG structure if it doesn't exist
    if (!this.svg) {
      this.initializeSVG();
    }
  }


  calculateSVGDimensions(): void {
    this.svgWidth = this.containerElement.nativeElement.clientWidth;
    this.svgHeight = this.svgWidth * this.svgHeightRatio;
    this.svgMargin = {
      top: this.svgMargin.top || 0,
      right: this.svgMargin.right || 0,
      bottom: this.svgMargin.bottom || 0,
      left: this.svgMargin.left || 0,
    };
    this.svgPadding = {
      top: this.svgPadding.top || 0,
      right: this.svgPadding.right || 0,
      bottom: this.svgPadding.bottom || 0,
      left: this.svgPadding.left || 0,
    };
    this.chartWidth = this.svgWidth - this.svgMargin.left - this.svgMargin.right;
    this.chartHeight = this.svgHeight - this.svgMargin.top - this.svgMargin.bottom;
  }

  initializeSVG(): void {
    // Create the SVG element with full dimensions
    this.svg = d3.select(this.containerElement.nativeElement)
      .append('svg')
      .attr('width', this.svgWidth)
      .attr('height', this.svgHeight)
      .attr('viewBox', `0 0 ${this.svgWidth} ${this.svgHeight}`)
      .attr('class', 'border');

    // Create chart group and translate by margins
    this.chartGroup = this.svg.append('g')
      .attr('class', 'chart-group')
      .attr('transform', `translate(${this.svgMargin.left}, ${this.svgMargin.top})`);

    this.xScale = d3.scaleBand<string>()
      .domain(this.data!.columns)
      .range([this.svgPadding.left, this.chartWidth - this.svgPadding.right])
      .padding(this.markPadding);

    this.yScale = d3.scaleBand<string>()
      .domain(this.data!.rows)
      .range([this.svgPadding.top, this.chartHeight])
      .padding(this.markPadding);

    this.xAxis = d3.axisBottom(this.xScale)
      .tickSize(0)
      .tickPadding(5);

    this.yAxis = d3.axisLeft(this.yScale)
      .tickSize(0)
      .tickPadding(5);

    this.chartGroup.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.chartHeight})`)
      .call(this.xAxis!)
      .select('.domain')
      .remove();

    this.chartGroup.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.svgPadding.left},0)`)
      .call(this.yAxis!)
      .select('.domain')
      .remove();
  }



  updateXAxis(): void {
    this.xScale?.domain(this.data!.columns);
    this.chartGroup.selectAll('.x-axis')
      .call(this.xAxis!)
      .select('.domain')
      .remove();
  }

  updateYAxis(): void {
    this.yScale?.domain(this.data!.rows);
    this.chartGroup.selectAll('.y-axis')
      .call(this.yAxis!)
      .select('.domain')
      .remove();
  }

  updateCells(): void {
    if (!this.data || !this.xScale || !this.yScale || !this.colorScale || !this.chartGroup) return;

    // DATA JOIN: Bind data with key function for proper tracking across updates
    this.chartGroup
      .selectAll('.cell')
      .data(this.data.cells, (d: any) => `${d.row}-${d.column}`)
      .join(
        // ENTER: New cells
        (enter: d3.Selection<SVGRectElement, HeatmapDataPoint, null, undefined>) =>
          enter.append('rect')
            .attr('class', 'cell')
            .attr('x', (d: HeatmapDataPoint) => this.xScale!(d.column) || 0)
            .attr('y', (d: HeatmapDataPoint) => this.yScale!(d.row) || 0)
            .attr('width', this.xScale.bandwidth())
            .attr('height', this.yScale.bandwidth())
            .attr('fill', (d: HeatmapDataPoint) =>
              d.value !== null ? this.colorScale!(d.value) : '#ccc'
            )
            .attr('rx', 2)
            .attr('ry', 2),
        // UPDATE: Existing cells
        (update: d3.Selection<SVGRectElement, HeatmapDataPoint, null, undefined>) =>
          update
            .attr('x', (d: HeatmapDataPoint) => this.xScale!(d.column) || 0)
            .attr('y', (d: HeatmapDataPoint) => this.yScale!(d.row) || 0)
            .attr('width', this.xScale.bandwidth())
            .attr('height', this.yScale.bandwidth())
            .attr('fill', (d: HeatmapDataPoint) =>
              d.value !== null ? this.colorScale!(d.value) : '#ccc'
            ),
        // EXIT: Remove cells that are no longer in data
        (exit: d3.Selection<SVGRectElement, HeatmapDataPoint, null, undefined>) =>
          exit.remove()
      );
  }

  ngOnDestroy(): void {
    console.log('HeatmapComponent destroyed');
  }


}
