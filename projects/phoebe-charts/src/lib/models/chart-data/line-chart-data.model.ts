export interface LineChartDataPoint {
  x: number | Date | string;
  y: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface LineChartSeries {
  id: string;
  name: string;
  data: LineChartDataPoint[];
  color?: string;
  strokeWidth?: number;
  strokeDashArray?: string;
  visible?: boolean;
  showPoints?: boolean;
  showLine?: boolean;
  showArea?: boolean;
  areaOpacity?: number;
  interpolation?: 'linear' | 'monotone' | 'step' | 'basis' | 'cardinal';
}

export interface LineChartData {
  series: LineChartSeries[];
  xAxisType?: 'numeric' | 'time' | 'category';
  yAxisType?: 'numeric' | 'logarithmic';
}

export const DEFAULT_LINE_CHART_SERIES: Partial<LineChartSeries> = {
  color: '#3b82f6',
  strokeWidth: 2,
  strokeDashArray: undefined,
  visible: true,
  showPoints: true,
  showLine: true,
  showArea: false,
  areaOpacity: 0.3,
  interpolation: 'monotone',
};

export const DEFAULT_LINE_CHART_DATA: Partial<LineChartData> = {
  xAxisType: 'numeric',
  yAxisType: 'numeric',
};

