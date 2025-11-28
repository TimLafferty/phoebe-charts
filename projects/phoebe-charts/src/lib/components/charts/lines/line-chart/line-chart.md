# LineChartComponent

A responsive line chart component for visualizing continuous data and time series using D3.js.

## Description

The `LineChartComponent` renders an SVG-based line chart with configurable dimensions, styling, and animation. It supports numeric x-axis values with automatic scaling, responsive resizing via ResizeObserver, and smooth monotone curve interpolation.

**Selector:** `phoebe-line-chart`

**Standalone:** Yes

---

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `data` | `LineChartDataPoint[]` | `[]` | Array of data points to plot. Each point must have `x` (number) and `y` (number) properties. |
| `dimensions` | `ChartDimensions` | `DEFAULT_CHART_DIMENSIONS` | Chart sizing configuration including width, height, and margins. |
| `xAxisLabel` | `string \| undefined` | `undefined` | Label text displayed below the X-axis. |
| `yAxisLabel` | `string \| undefined` | `undefined` | Label text displayed to the left of the Y-axis (rotated 90°). |
| `showGrid` | `boolean` | `true` | When `true`, displays horizontal and vertical grid lines behind the chart. |
| `animate` | `boolean` | `true` | When `true`, animates the line drawing on initial render and data changes. |
| `lineColor` | `string` | `'#3b82f6'` | CSS color value for the line stroke and data point fill. |
| `strokeWidth` | `number` | `2` | Width of the line stroke in pixels. |

---

## Outputs

This component does not emit any events.

---

## Data Model

### LineChartDataPoint

```typescript
interface LineChartDataPoint {
  x: number | Date | string;    // X-axis value (required)
  y: number;                     // Y-axis value (required)
  label?: string;                // Optional label for the data point
  metadata?: Record<string, any>; // Optional metadata for tooltips/events
}
```

**Location:** `models/chart-data/line-chart-data.model.ts`

---

## Default Values

Defaults are sourced from `chart-dimensions.model.ts`:

```typescript
DEFAULT_CHART_DIMENSIONS = {
  width: 600,
  height: 400,
  minWidth: 200,
  minHeight: 150,
  responsive: true,
  maintainAspectRatio: false,
  margins: {
    top: 20,
    right: 30,
    bottom: 40,
    left: 50
  },
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}
```

---

## Usage Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { LineChartComponent, LineChartDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-basic-example',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart [data]="chartData" />
  `
})
export class BasicExampleComponent {
  chartData: LineChartDataPoint[] = [
    { x: 1, y: 10 },
    { x: 2, y: 25 },
    { x: 3, y: 18 },
    { x: 4, y: 32 },
    { x: 5, y: 28 }
  ];
}
```

### With Axis Labels

```typescript
@Component({
  selector: 'app-labeled-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="salesData"
      [xAxisLabel]="'Quarter'"
      [yAxisLabel]="'Revenue ($K)'"
    />
  `
})
export class LabeledChartComponent {
  salesData: LineChartDataPoint[] = [
    { x: 1, y: 120 },
    { x: 2, y: 150 },
    { x: 3, y: 180 },
    { x: 4, y: 210 }
  ];
}
```

### Custom Styling

```typescript
import { ChartDimensions } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-styled-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="data"
      [dimensions]="dimensions"
      [lineColor]="'#10b981'"
      [strokeWidth]="3"
      [showGrid]="false"
      [animate]="false"
    />
  `
})
export class StyledChartComponent {
  data: LineChartDataPoint[] = [
    { x: 0, y: 5 },
    { x: 1, y: 12 },
    { x: 2, y: 8 },
    { x: 3, y: 15 }
  ];

  dimensions: ChartDimensions = {
    width: 800,
    height: 500,
    margins: {
      top: 30,
      right: 40,
      bottom: 60,
      left: 70
    }
  };
}
```

### Responsive Container

```typescript
@Component({
  selector: 'app-responsive-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <div class="chart-wrapper">
      <phoebe-line-chart
        [data]="data"
        [xAxisLabel]="'Time'"
        [yAxisLabel]="'Value'"
      />
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 100%;
      height: 400px;
    }
  `]
})
export class ResponsiveChartComponent {
  data: LineChartDataPoint[] = [
    { x: 0, y: 100 },
    { x: 1, y: 150 },
    { x: 2, y: 120 },
    { x: 3, y: 200 },
    { x: 4, y: 180 }
  ];
}
```

---

## Dependencies

- `@angular/core` >= 17.0.0
- `@angular/common` >= 17.0.0
- `d3` ^7.0.0

---

## Behavior Notes

- **Responsive Resizing:** Uses `ResizeObserver` to automatically redraw the chart when the container size changes.
- **Animation:** Line is drawn progressively over 1000ms using stroke-dasharray animation. Data points fade in after line animation completes.
- **Y-Axis Padding:** Y-axis domain is automatically padded by 10% on both ends for visual breathing room.
- **Curve Type:** Uses `d3.curveMonotoneX` for smooth curves that preserve monotonicity.
- **Empty Data:** If `data` array is empty, the chart clears all SVG content.

---

## Version Information

- **Version:** 0.0.5
- **Last Updated:** 2024-11-28
- **Status:** Stable
