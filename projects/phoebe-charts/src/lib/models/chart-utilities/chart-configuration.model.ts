export interface ChartConfiguration {
  // Title and Text Display
  displayTitle?: boolean;
  displaySubtitle?: boolean;
  displayFooter?: boolean;

  // Axis Display
  displayXAxis?: boolean;
  displayXAxisLabel?: boolean;
  displayYAxis?: boolean;
  displayYAxisLabel?: boolean;

  // Grid and Background
  displayGrid?: boolean;
  displayGridX?: boolean;
  displayGridY?: boolean;

  // Data Display
  displayDataPoints?: boolean;
  displayLine?: boolean;
  displayArea?: boolean;
  displayLegend?: boolean;

  // Interaction Features
  enableTooltip?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableHover?: boolean;
  enableAnimation?: boolean;

  // Additional Features
  enableCrosshair?: boolean;
  enableExport?: boolean;
  enableResize?: boolean;
}

export const DEFAULT_CHART_CONFIGURATION: ChartConfiguration = {
  // Title and Text Display
  displayTitle: true,
  displaySubtitle: true,
  displayFooter: true,

  // Axis Display
  displayXAxis: true,
  displayXAxisLabel: true,
  displayYAxis: true,
  displayYAxisLabel: true,

  // Grid and Background
  displayGrid: true,
  displayGridX: true,
  displayGridY: true,

  // Data Display
  displayDataPoints: true,
  displayLine: true,
  displayArea: false,
  displayLegend: false,

  // Interaction Features
  enableTooltip: false,
  enableZoom: false,
  enablePan: false,
  enableHover: false,
  enableAnimation: false,

  // Additional Features
  enableCrosshair: false,
  enableExport: false,
  enableResize: false,
};

