# Phoebe Charts

A modern, lightweight Angular charting library built on top of D3.js for creating beautiful and interactive data visualizations and KPI dashboards.

## Features

- **Angular 17+** - Built with the latest Angular features including standalone components
- **D3.js Powered** - Leverages the power and flexibility of D3.js for charts
- **KPI Cards** - Ready-to-use KPI card components for dashboards
- **Theme Support** - Light and dark theme support across components
- **Customizable** - Extensive configuration options for styling and behavior
- **Performant** - Optimized for smooth animations and large datasets
- **Responsive** - Charts and cards adapt to container size changes
- **Type Safe** - Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @timalexlafferty/phoebe-charts d3
```

## Peer Dependencies

This library requires:
- `@angular/common` >=17.0.0 <20.0.0
- `@angular/core` >=17.0.0 <20.0.0
- `d3` ^7.0.0

## Components

### Charts

#### LineChartComponent

A responsive line chart component for visualizing time-series or sequential data.

**Selector:** `phoebe-line-chart`

```typescript
import { LineChartComponent } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="chartData"
      [dimensions]="{ width: 800, height: 400 }"
      [showGrid]="true"
      [animate]="true"
      [lineColor]="'#3b82f6'"
      xAxisLabel="Time"
      yAxisLabel="Value">
    </phoebe-line-chart>
  `
})
export class MyComponent {
  chartData = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 },
    { x: 4, y: 50 }
  ];
}
```

**Inputs:**
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `Array<{x: number, y: number}>` | `[]` | Data points to display |
| `dimensions` | `ChartDimensions` | See below | Chart dimensions configuration |
| `xAxisLabel` | `string` | - | Label for X axis |
| `yAxisLabel` | `string` | - | Label for Y axis |
| `showGrid` | `boolean` | `true` | Show/hide grid lines |
| `animate` | `boolean` | `true` | Enable/disable animations |
| `lineColor` | `string` | `'#3b82f6'` | Color of the line |
| `strokeWidth` | `number` | `2` | Width of the line |

#### HeatmapComponent

A D3-powered heatmap for matrix data visualization.

**Selector:** `phoebe-heatmap`

```typescript
import { HeatmapComponent, HeatmapData } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [HeatmapComponent],
  template: `
    <phoebe-heatmap [data]="heatmapData"></phoebe-heatmap>
  `
})
export class MyComponent {
  heatmapData: HeatmapData = {
    rows: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    columns: ['9AM', '12PM', '3PM', '6PM'],
    cells: [
      { row: 'Mon', column: '9AM', value: 10 },
      { row: 'Mon', column: '12PM', value: 25 },
      // ...more cells
    ]
  };
}
```

**Inputs:**
| Input | Type | Description |
|-------|------|-------------|
| `data` | `HeatmapData` | Heatmap data with rows, columns, and cell values |
| `dimensions` | `ChartDimensions` | Chart dimensions configuration |

### KPI Cards

#### StatCardComponent

A simple stat card with optional trend indicator.

**Selector:** `phoebe-stat-card`

```typescript
import { StatCardComponent } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [StatCardComponent],
  template: `
    <phoebe-stat-card
      label="Total Revenue"
      value="$45,231"
      change="+12.5%"
      trend="up"
      theme="light">
    </phoebe-stat-card>
  `
})
```

**Inputs:**
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | `''` | Label for the stat |
| `value` | `string \| number` | `''` | Main value to display |
| `change` | `string \| number` | - | Change value (e.g., "+12%") |
| `trend` | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Trend direction |
| `comparisonLabel` | `string` | `'vs last period'` | Label for comparison |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |

#### ProgressCardComponent

A progress card showing current progress toward a target.

**Selector:** `phoebe-progress-card`

```typescript
import { ProgressCardComponent } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [ProgressCardComponent],
  template: `
    <phoebe-progress-card
      label="Sales Target"
      [current]="750"
      [target]="1000"
      unit="units"
      [showPercentage]="true"
      theme="light">
    </phoebe-progress-card>
  `
})
```

**Inputs:**
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | `''` | Label for the progress |
| `current` | `number` | `0` | Current value |
| `target` | `number` | `100` | Target value |
| `unit` | `string` | - | Unit label (e.g., "units", "items") |
| `showPercentage` | `boolean` | `true` | Show percentage in progress bar |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |

#### KpiBasicBanComponent

A Big Ass Number (BAN) card for displaying single KPI metrics.

**Selector:** `phoebe-kpi-basic-ban`

```typescript
import { KpiBasicBanComponent, KpiBasicBanProps } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [KpiBasicBanComponent],
  template: `
    <phoebe-kpi-basic-ban [props]="banProps" theme="light"></phoebe-kpi-basic-ban>
  `
})
export class MyComponent {
  banProps: KpiBasicBanProps = {
    metric: 'Total Revenue',
    value: 125000,
    label: 'Q4 2024',
    metricType: 'currency',
    iconGroup: 'financial',
    iconVariant: 'dollar'
  };
}
```

**Props Interface:**
```typescript
interface KpiBasicBanProps {
  metric: string;           // Metric name
  value: number;            // Value to display
  label?: string;           // Optional label below value
  timeframe?: string;       // Optional timeframe
  metricType: 'numeric' | 'percentage' | 'currency';
  iconGroup?: BanIconGroup; // Icon category
  iconVariant?: BanIconVariant; // Specific icon
  icon?: string;            // Custom FontAwesome icon class
  colors?: { background: string; text: string; accent: string; };
}
```

**Icon Groups:** `'financial'`, `'users'`, `'performance'`, `'engagement'`, `'commerce'`, `'time'`, `'analytics'`, `'status'`

#### KpiBasicComparisonComponent

A comparison KPI card showing current vs previous period metrics.

**Selector:** `phoebe-kpi-basic-comparison`

```typescript
import { KpiBasicComparisonComponent } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [KpiBasicComparisonComponent],
  template: `
    <phoebe-kpi-basic-comparison [props]="comparisonProps" theme="light">
    </phoebe-kpi-basic-comparison>
  `
})
export class MyComponent {
  comparisonProps = {
    metric: 'Monthly Revenue',
    timeframe: 'December 2024',
    currentPeriodValue: 125000,
    currentPeriodDisplay: '$125K',
    previousPeriodValue: 110000,
    previousPeriodDisplay: '$110K',
    negativeIsBetter: false,
    description: 'Total revenue for the month',
    metricType: 'currency',
    iconSet: 'arrow-dots',
    colors: { positive: '#10B981', negative: '#EF4444', neutral: '#6B7280' }
  };
}
```

#### KpiGoalTrackerComponent

A D3-powered goal tracking visualization with progress bar.

**Selector:** `phoebe-kpi-goal-tracker`

```typescript
import { KpiGoalTrackerComponent } from '@timalexlafferty/phoebe-charts';

@Component({
  imports: [KpiGoalTrackerComponent],
  template: `
    <phoebe-kpi-goal-tracker
      title="Q4 Sales Goal"
      [currentValue]="75000"
      [goalValue]="100000"
      [paceValue]="80000"
      paceLabel="Projected"
      [benchmarkValue]="70000"
      benchmarkLabel="Last Year"
      unit="$"
      theme="light">
    </phoebe-kpi-goal-tracker>
  `
})
```

**Inputs:**
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | `string` | `''` | Goal title |
| `currentValue` | `number` | `0` | Current progress value |
| `goalValue` | `number` | `100` | Target goal value |
| `paceValue` | `number` | - | Projected pace value |
| `paceLabel` | `string` | `'Pace'` | Label for pace indicator |
| `benchmarkValue` | `number` | - | Benchmark comparison value |
| `benchmarkLabel` | `string` | `'Prev. Period'` | Benchmark label |
| `unit` | `string` | - | Unit display (e.g., "$", "%") |
| `startDate` | `string` | - | Period start date |
| `endDate` | `string` | - | Period end date |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `roundness` | `number` | `2` | Border radius for progress bar |

## Pipes

### KpiBanPipe

Formats numbers for KPI display with appropriate abbreviations.

```typescript
import { KpiBanPipe } from '@timalexlafferty/phoebe-charts';

// In template:
{{ 125000 | KpiBan:'currency' }}  // Output: $125K
{{ 45.678 | KpiBan:'percentage' }} // Output: 45.7%
{{ 1500000 | KpiBan:'numeric' }}  // Output: 1.5M
```

**Metric Types:**
- `'numeric'` (default): Abbreviates large numbers (K, M)
- `'percentage'`: Formats with % suffix
- `'currency'`: Adds $ prefix with abbreviations

## Interfaces

### ChartDimensions

```typescript
interface ChartDimensions {
  width?: number;           // Chart width (default: 600)
  height?: number;          // Chart height (default: 400)
  minWidth?: number;        // Minimum width (default: 200)
  minHeight?: number;       // Minimum height (default: 150)
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  margins?: ChartMargins;
  padding?: ChartPadding;
  responsive?: boolean;     // Enable responsive sizing (default: true)
  maintainAspectRatio?: boolean;
}

interface ChartMargins {
  top: number;    // default: 20
  right: number;  // default: 30
  bottom: number; // default: 40
  left: number;   // default: 50
}
```

### HeatmapData

```typescript
interface HeatmapData {
  rows: string[];
  columns: string[];
  cells: HeatmapDataPoint[];
}

interface HeatmapDataPoint {
  row: string;
  column: string;
  value: number | null;
}
```

## Theming

All components support light and dark themes via the `theme` input:

```html
<phoebe-stat-card theme="dark" ...></phoebe-stat-card>
<phoebe-kpi-goal-tracker theme="light" ...></phoebe-kpi-goal-tracker>
```

## Development

### Building the Library

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Running Demo

```bash
npm start
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/timlafferty/phoebe-charts/issues).
