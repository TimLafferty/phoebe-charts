# Phoebe Charts - Component Documentation

Complete API reference for all chart components in the Phoebe Charts library.

---

## Table of Contents

- [LineChartComponent](#linechartcomponent)
- [HeatmapComponent](#heatmapcomponent)
- [Data Models](#data-models)
- [Configuration](#configuration)
- [Themes](#themes)
- [Dimensions](#dimensions)

---

## LineChartComponent

A flexible line chart component for visualizing time series and continuous data.

**Selector:** `phoebe-line-chart`

**Import:**
```typescript
import { LineChartComponent } from '@timalexlafferty/phoebe-charts';
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `LineChartDataPoint[]` | `[]` | Array of data points for the line chart |
| `dimensions` | `ChartDimensions` | `DEFAULT_CHART_DIMENSIONS` | Chart size and margin configuration |
| `xAxisLabel` | `string` | `undefined` | Label for the X-axis |
| `yAxisLabel` | `string` | `undefined` | Label for the Y-axis |
| `showGrid` | `boolean` | `true` | Display grid lines on the chart |
| `animate` | `boolean` | `true` | Enable animation on chart rendering |
| `lineColor` | `string` | `'#3b82f6'` | Color of the line and data points |
| `strokeWidth` | `number` | `2` | Width of the line stroke in pixels |

### Basic Example

```typescript
import { Component } from '@angular/core';
import { LineChartComponent, LineChartDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="chartData"
      [xAxisLabel]="'Month'"
      [yAxisLabel]="'Revenue ($)'"
    />
  `
})
export class ExampleComponent {
  chartData: LineChartDataPoint[] = [
    { x: 1, y: 100 },
    { x: 2, y: 150 },
    { x: 3, y: 120 },
    { x: 4, y: 200 },
    { x: 5, y: 180 }
  ];
}
```

### Custom Styling Example

```typescript
import { Component } from '@angular/core';
import {
  LineChartComponent,
  LineChartDataPoint,
  ChartDimensions
} from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-styled-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="chartData"
      [dimensions]="dimensions"
      [lineColor]="'#10b981'"
      [strokeWidth]="3"
      [showGrid]="false"
      [animate]="true"
      [xAxisLabel]="'Time'"
      [yAxisLabel]="'Value'"
    />
  `
})
export class StyledChartComponent {
  chartData: LineChartDataPoint[] = [
    { x: 0, y: 10, label: 'Start' },
    { x: 1, y: 25 },
    { x: 2, y: 18 },
    { x: 3, y: 32 },
    { x: 4, y: 28, label: 'End' }
  ];

  dimensions: ChartDimensions = {
    width: 800,
    height: 500,
    margins: {
      top: 30,
      right: 40,
      bottom: 50,
      left: 60
    }
  };
}
```

### Time Series Example

```typescript
import { Component } from '@angular/core';
import { LineChartComponent, LineChartDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-time-series',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="timeSeriesData"
      [xAxisLabel]="'Date'"
      [yAxisLabel]="'Temperature (°F)'"
      [lineColor]="'#ef4444'"
    />
  `
})
export class TimeSeriesComponent {
  timeSeriesData: LineChartDataPoint[] = [
    { x: new Date('2024-01-01'), y: 32 },
    { x: new Date('2024-02-01'), y: 35 },
    { x: new Date('2024-03-01'), y: 45 },
    { x: new Date('2024-04-01'), y: 58 },
    { x: new Date('2024-05-01'), y: 68 },
    { x: new Date('2024-06-01'), y: 78 }
  ];
}
```

---

## HeatmapComponent

A powerful heatmap component for visualizing matrix data with color-coded cells, ideal for correlation matrices, time-based activity patterns, and density visualizations.

**Selector:** `phoebe-heatmap`

**Import:**
```typescript
import { HeatmapComponent, HeatmapData, HeatmapDataPoint } from '@timalexlafferty/phoebe-charts';
```

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `HeatmapData` | `null` | Heatmap data including rows, columns, and cell values |
| `dimensions` | `ChartDimensions` | `DEFAULT_CHART_DIMENSIONS` | Chart size and margin configuration |

### Data Model

#### HeatmapDataPoint

Individual cell in the heatmap matrix.

```typescript
interface HeatmapDataPoint {
  row: string;        // Row identifier (required)
  column: string;     // Column identifier (required)
  value: number | null; // Cell value, null for empty cells (required)
}
```

#### HeatmapData

Complete heatmap dataset.

```typescript
interface HeatmapData {
  rows: string[];              // Array of row labels (required)
  columns: string[];           // Array of column labels (required)
  cells: HeatmapDataPoint[];   // Array of cell data points (required)
}
```

### Basic Example

```typescript
import { Component } from '@angular/core';
import { HeatmapComponent, HeatmapData } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [HeatmapComponent],
  template: `
    <phoebe-heatmap [data]="heatmapData" />
  `
})
export class ExampleComponent {
  heatmapData: HeatmapData = {
    rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    columns: ['9AM', '12PM', '3PM', '6PM'],
    cells: [
      { row: 'Mon', column: '9AM', value: 45 },
      { row: 'Mon', column: '12PM', value: 78 },
      { row: 'Mon', column: '3PM', value: 62 },
      { row: 'Mon', column: '6PM', value: 34 },
      { row: 'Tue', column: '9AM', value: 52 },
      { row: 'Tue', column: '12PM', value: 85 },
      // ... more cells
    ]
  };
}
```

### Activity Heatmap Example

Perfect for visualizing user activity patterns across time periods.

```typescript
import { Component } from '@angular/core';
import { HeatmapComponent, HeatmapData, HeatmapDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-activity-heatmap',
  standalone: true,
  imports: [HeatmapComponent],
  template: `
    <phoebe-heatmap
      [data]="activityData"
    />
  `
})
export class ActivityHeatmapComponent {
  activityData: HeatmapData;

  constructor() {
    this.activityData = this.generateActivityData();
  }

  private generateActivityData(): HeatmapData {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
    const cells: HeatmapDataPoint[] = [];

    for (const day of days) {
      for (const hour of hours) {
        cells.push({
          row: day,
          column: hour,
          value: Math.round(Math.random() * 100)
        });
      }
    }

    return { rows: days, columns: hours, cells };
  }
}
```

### Correlation Matrix Example

Ideal for displaying correlation coefficients between variables.

```typescript
import { Component } from '@angular/core';
import { HeatmapComponent, HeatmapData, HeatmapDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-correlation-matrix',
  standalone: true,
  imports: [HeatmapComponent],
  template: `
    <phoebe-heatmap
      [data]="correlationData"
    />
  `
})
export class CorrelationMatrixComponent {
  correlationData: HeatmapData;

  constructor() {
    const variables = ['Revenue', 'Expenses', 'Profit', 'Growth', 'Customers'];
    const cells: HeatmapDataPoint[] = [];

    // Generate correlation matrix (symmetric matrix with 1.0 on diagonal)
    for (const row of variables) {
      for (const col of variables) {
        const value = row === col 
          ? 1.0 
          : Math.round((Math.random() * 2 - 1) * 100) / 100;
        cells.push({ row, column: col, value });
      }
    }

    this.correlationData = {
      rows: variables,
      columns: variables,
      cells
    };
  }
}
```

### Temperature Data Example

Great for seasonal or geographic temperature visualizations.

```typescript
import { Component } from '@angular/core';
import { HeatmapComponent, HeatmapData, HeatmapDataPoint } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-temperature-heatmap',
  standalone: true,
  imports: [HeatmapComponent],
  template: `
    <phoebe-heatmap [data]="temperatureData" />
  `
})
export class TemperatureHeatmapComponent {
  temperatureData: HeatmapData;

  constructor() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const cities = ['NYC', 'LA', 'Chicago', 'Miami', 'Seattle'];
    const cells: HeatmapDataPoint[] = [];

    const temps: Record<string, number[]> = {
      'NYC': [32, 35, 45, 55, 65, 75, 80, 78, 70, 58, 48, 38],
      'LA': [58, 60, 62, 65, 68, 72, 78, 80, 78, 72, 65, 58],
      'Chicago': [25, 30, 40, 52, 62, 72, 78, 76, 68, 55, 42, 30],
      'Miami': [68, 70, 74, 78, 82, 85, 88, 88, 86, 82, 76, 70],
      'Seattle': [42, 45, 48, 52, 58, 64, 68, 68, 62, 54, 46, 42]
    };

    for (const city of cities) {
      for (let i = 0; i < months.length; i++) {
        cells.push({
          row: city,
          column: months[i],
          value: temps[city][i]
        });
      }
    }

    this.temperatureData = { rows: cities, columns: months, cells };
  }
}
```

### Handling Missing Data

Heatmap supports null values for cells with missing data.

```typescript
const dataWithGaps: HeatmapData = {
  rows: ['A', 'B', 'C'],
  columns: ['X', 'Y', 'Z'],
  cells: [
    { row: 'A', column: 'X', value: 10 },
    { row: 'A', column: 'Y', value: null },  // Missing data
    { row: 'A', column: 'Z', value: 30 },
    { row: 'B', column: 'X', value: 15 },
    { row: 'B', column: 'Y', value: 25 },
    { row: 'B', column: 'Z', value: null },  // Missing data
    // ... etc
  ]
};
```

Cells with `null` values will be rendered with a neutral gray color (#ccc) to indicate missing data.

### Features

- **Automatic Color Scaling**: Colors are automatically mapped to values using a sequential color scale
- **Responsive Design**: Automatically adjusts to container width
- **Missing Data Support**: Handles null values gracefully with neutral coloring
- **Clean Axes**: Axes display without domain lines for a modern look
- **Rounded Corners**: Cells have subtle rounded corners for visual appeal
- **Proper Spacing**: Configurable padding between cells via `markPadding` property

### Styling and Theming

The heatmap uses a default blue-to-red color gradient. The component automatically calculates the value domain from your data and maps it to colors.

**Default Colors:**
- Primary: `#1A5F9C` (Blue)
- Secondary: `#FF6B6B` (Red)
- Neutral: `#94a3b8` (Gray - for null values)

### Best Practices

1. **Label Clarity**: Use short, descriptive labels for rows and columns
2. **Data Density**: Heatmaps work best with 3-50 rows and columns
3. **Value Range**: Ensure values have sufficient variation for color differentiation
4. **Missing Data**: Use `null` for truly missing data rather than `0`
5. **Symmetry**: For correlation matrices, ensure data is symmetric
6. **Ordering**: Consider ordering rows/columns logically (alphabetically, by magnitude, etc.)

### Common Use Cases

- **Time-Based Activity**: Website traffic by hour and day of week
- **Correlation Analysis**: Variable relationships in datasets
- **Geographic Data**: Temperature, precipitation, or other metrics by location
- **Performance Metrics**: KPI tracking across teams and time periods
- **User Behavior**: Feature usage patterns across user segments
- **Quality Control**: Defect rates by product line and time period

---

## Data Models

### LineChartDataPoint

Individual data point for line charts.

```typescript
interface LineChartDataPoint {
  x: number | Date | string;    // X-axis value (required)
  y: number;                     // Y-axis value (required)
  label?: string;                // Optional data point label
  metadata?: Record<string, any>; // Optional metadata for tooltips/events
}
```

### LineChartSeries

Configuration for a single data series (multi-line charts).

```typescript
interface LineChartSeries {
  id: string;                    // Unique series identifier (required)
  name: string;                  // Series display name (required)
  data: LineChartDataPoint[];    // Array of data points (required)
  color?: string;                // Series color (default: '#3b82f6')
  strokeWidth?: number;          // Line stroke width (default: 2)
  strokeDashArray?: string;      // CSS stroke dash pattern (e.g., '5,5')
  visible?: boolean;             // Series visibility (default: true)
  showPoints?: boolean;          // Show data point markers (default: true)
  showLine?: boolean;            // Show connecting line (default: true)
  showArea?: boolean;            // Show area fill below line (default: false)
  areaOpacity?: number;          // Area fill opacity (default: 0.3)
  interpolation?: 'linear' | 'monotone' | 'step' | 'basis' | 'cardinal';
}
```

**Interpolation Types:**
- `linear` - Straight lines between points
- `monotone` - Smooth curves that preserve monotonicity (default)
- `step` - Step function (horizontal then vertical)
- `basis` - B-spline curve
- `cardinal` - Cardinal spline curve

### LineChartData

Container for multi-series line chart data.

```typescript
interface LineChartData {
  series: LineChartSeries[];     // Array of series (required)
  xAxisType?: 'numeric' | 'time' | 'category';  // X-axis type (default: 'numeric')
  yAxisType?: 'numeric' | 'logarithmic';        // Y-axis type (default: 'numeric')
}
```

---

## Configuration

### ChartConfiguration

Global configuration options available for all chart types.

```typescript
interface ChartConfiguration {
  // Title and Text Display
  displayTitle?: boolean;        // Show chart title (default: true)
  displaySubtitle?: boolean;     // Show subtitle (default: true)
  displayFooter?: boolean;       // Show footer text (default: true)

  // Axis Display
  displayXAxis?: boolean;        // Show X-axis (default: true)
  displayXAxisLabel?: boolean;   // Show X-axis label (default: true)
  displayYAxis?: boolean;        // Show Y-axis (default: true)
  displayYAxisLabel?: boolean;   // Show Y-axis label (default: true)

  // Grid and Background
  displayGrid?: boolean;         // Show grid (default: true)
  displayGridX?: boolean;        // Show vertical grid lines (default: true)
  displayGridY?: boolean;        // Show horizontal grid lines (default: true)

  // Data Display
  displayDataPoints?: boolean;   // Show data point markers (default: true)
  displayLine?: boolean;         // Show line (default: true)
  displayArea?: boolean;         // Show area fill (default: false)
  displayLegend?: boolean;       // Show legend (default: false)

  // Interaction Features
  enableTooltip?: boolean;       // Enable tooltips (default: false)
  enableZoom?: boolean;          // Enable zoom (default: false)
  enablePan?: boolean;           // Enable pan (default: false)
  enableHover?: boolean;         // Enable hover effects (default: false)
  enableAnimation?: boolean;     // Enable animations (default: false)

  // Additional Features
  enableCrosshair?: boolean;     // Show crosshair cursor (default: false)
  enableExport?: boolean;        // Enable export functionality (default: false)
  enableResize?: boolean;        // Enable resizing (default: false)
}
```

### ChartContext

Text content for chart display.

```typescript
interface ChartContext {
  chartTitle?: string;           // Chart title text
  chartSubtitle?: string;        // Chart subtitle text
  chartFooter?: string;          // Chart footer text
}
```

---

## Themes

### ChartTheme

Complete theming configuration for charts.

```typescript
interface ChartTheme {
  name: string;                  // Theme name (required)
  fonts?: ChartFonts;            // Font family settings
  fontSizes?: ChartFontSizes;    // Font size settings
  colors?: ChartColors;          // Color palette settings
  borderRadius?: number;         // Border radius in pixels (default: 4)
  strokeWidth?: number;          // Default stroke width (default: 2)
  opacity?: number;              // Default opacity (default: 1)
  animationDuration?: number;    // Animation duration in ms (default: 1000)
}
```

### ChartFonts

```typescript
interface ChartFonts {
  titleFont?: string;            // Title font family
  subtitleFont?: string;         // Subtitle font family
  labelFont?: string;            // Axis label font family
  tickFont?: string;             // Tick label font family
  legendFont?: string;           // Legend font family
  tooltipFont?: string;          // Tooltip font family
}
```

### ChartFontSizes

```typescript
interface ChartFontSizes {
  titleSize?: number;            // Title font size (default: 20px)
  subtitleSize?: number;         // Subtitle size (default: 14px)
  labelSize?: number;            // Label size (default: 12px)
  tickSize?: number;             // Tick label size (default: 11px)
  legendSize?: number;           // Legend size (default: 12px)
  tooltipSize?: number;          // Tooltip size (default: 12px)
}
```

### ChartColors

```typescript
interface ChartColors {
  primary?: string;              // Primary color (default: '#3b82f6')
  secondary?: string;            // Secondary color (default: '#8b5cf6')
  background?: string;           // Background color (default: '#ffffff')
  gridColor?: string;            // Grid line color (default: '#e5e7eb')
  axisColor?: string;            // Axis color (default: '#6b7280')
  textColor?: string;            // Text color (default: '#1f2937')
  tooltipBackground?: string;    // Tooltip background (default: '#1f2937')
  tooltipText?: string;          // Tooltip text color (default: '#ffffff')
  seriesColors?: string[];       // Series color palette
}
```

### Pre-defined Themes

**DEFAULT_THEME** - Light theme with blue primary color
```typescript
import { DEFAULT_THEME } from '@timalexlafferty/phoebe-charts';
```

**DARK_THEME** - Dark theme optimized for dark backgrounds
```typescript
import { DARK_THEME } from '@timalexlafferty/phoebe-charts';
```

---

## Dimensions

### ChartDimensions

Size and spacing configuration for charts.

```typescript
interface ChartDimensions {
  width?: number;                // Chart width in pixels (default: 600)
  height?: number;               // Chart height in pixels (default: 400)
  minWidth?: number;             // Minimum width (default: 200)
  minHeight?: number;            // Minimum height (default: 150)
  maxWidth?: number;             // Maximum width (default: undefined)
  maxHeight?: number;            // Maximum height (default: undefined)
  aspectRatio?: number;          // Aspect ratio (default: undefined)
  margins?: ChartMargins;        // Chart margins object
  padding?: ChartPadding;        // Chart padding object
  responsive?: boolean;          // Enable responsive design (default: true)
  maintainAspectRatio?: boolean; // Maintain aspect ratio (default: false)
}
```

### ChartMargins

Space between the chart container and the plot area.

```typescript
interface ChartMargins {
  top: number;                   // Top margin (default: 20px)
  right: number;                 // Right margin (default: 30px)
  bottom: number;                // Bottom margin (default: 40px)
  left: number;                  // Left margin (default: 50px)
}
```

### ChartPadding

Internal padding within the plot area.

```typescript
interface ChartPadding {
  top: number;                   // Top padding (default: 0)
  right: number;                 // Right padding (default: 0)
  bottom: number;                // Bottom padding (default: 0)
  left: number;                  // Left padding (default: 0)
}
```

### Default Dimensions

```typescript
import { DEFAULT_CHART_DIMENSIONS } from '@timalexlafferty/phoebe-charts';

// DEFAULT_CHART_DIMENSIONS = {
//   width: 600,
//   height: 400,
//   minWidth: 200,
//   minHeight: 150,
//   responsive: true,
//   maintainAspectRatio: false,
//   margins: { top: 20, right: 30, bottom: 40, left: 50 },
//   padding: { top: 0, right: 0, bottom: 0, left: 0 }
// }
```

### Responsive Example

```typescript
@Component({
  selector: 'app-responsive-chart',
  template: `
    <div class="chart-container">
      <phoebe-line-chart
        [data]="data"
        [dimensions]="responsiveDimensions"
      />
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      max-width: 1200px;
    }
  `]
})
export class ResponsiveChartComponent {
  responsiveDimensions: ChartDimensions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 16 / 9,
    minWidth: 300,
    minHeight: 200
  };
}
```

---

## Available Components

| Component | Status | Description |
|-----------|--------|-------------|
| `phoebe-line-chart` | ✅ Available | Line charts for time series and continuous data |
| `phoebe-heatmap` | ✅ Available | Matrix visualization with color gradients |

## Planned Components

The following components are planned for future releases:

| Component | Status | Description |
|-----------|--------|-------------|
| `phoebe-bar-chart` | Planned | Vertical and horizontal bar charts |
| `phoebe-distribution-chart` | Planned | Histograms, box plots, violin plots |
| `phoebe-radial-chart` | Planned | Pie, donut, polar, and radar charts |
| `phoebe-data-table` | Planned | Sortable, filterable data tables |

---

## Installation

```bash
npm install @timalexlafferty/phoebe-charts d3
```

### Peer Dependencies

- `@angular/core` >= 17.0.0
- `@angular/common` >= 17.0.0
- `d3` ^7.0.0
