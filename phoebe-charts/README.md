# Phoebe Charts

A modern, lightweight Angular charting library built on top of D3.js for creating beautiful and interactive data visualizations.

## Features

- 🚀 **Angular 17+** - Built with the latest Angular features including standalone components
- 📊 **D3.js Powered** - Leverages the power and flexibility of D3.js
- 🎨 **Customizable** - Extensive configuration options for styling and behavior
- ⚡ **Performant** - Optimized for smooth animations and large datasets
- 📱 **Responsive** - Charts adapt to container size changes
- 🎯 **Type Safe** - Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install phoebe-charts d3
```

or with yarn:

```bash
yarn add phoebe-charts d3
```

## Peer Dependencies

This library requires:
- `@angular/common` ^17.0.0
- `@angular/core` ^17.0.0
- `d3` ^7.0.0

## Usage

### Basic Line Chart

```typescript
import { Component } from '@angular/core';
import { LineChartComponent, DataPoint, ChartConfig } from 'phoebe-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="chartData"
      [config]="chartConfig">
    </phoebe-line-chart>
  `
})
export class AppComponent {
  chartData: DataPoint[] = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 },
    { x: 4, y: 50 }
  ];

  chartConfig: ChartConfig = {
    width: 800,
    height: 400,
    xAxisLabel: 'Time',
    yAxisLabel: 'Value',
    showGrid: true,
    animate: true
  };
}
```

## API Reference

### DataPoint

```typescript
interface DataPoint {
  x: number;
  y: number;
}
```

### ChartConfig

```typescript
interface ChartConfig {
  width?: number;          // Chart width in pixels (default: 600)
  height?: number;         // Chart height in pixels (default: 400)
  margin?: Margin;         // Chart margins
  xAxisLabel?: string;     // Label for X axis
  yAxisLabel?: string;     // Label for Y axis
  showGrid?: boolean;      // Show/hide grid lines (default: true)
  animate?: boolean;       // Enable/disable animations (default: true)
  lineColor?: string;      // Color of the line (default: '#4285f4')
  lineWidth?: number;      // Width of the line in pixels (default: 2)
  pointRadius?: number;    // Radius of data points (default: 4)
  showPoints?: boolean;    // Show/hide data points (default: true)
}
```

### Margin

```typescript
interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
```

## Components

### LineChartComponent

A responsive line chart component for visualizing time-series or sequential data.

**Selector:** `phoebe-line-chart`

**Inputs:**
- `data: DataPoint[]` - Array of data points to display
- `config: ChartConfig` - Configuration object for chart appearance and behavior

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

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/your-username/phoebe-charts/issues).
