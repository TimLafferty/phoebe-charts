export interface RadialDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface RadialChartData {
  data: RadialDataPoint[];
  type?: 'pie' | 'donut' | 'polar' | 'radar';
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

export const DEFAULT_RADIAL_CHART_DATA: Partial<RadialChartData> = {
  type: 'pie',
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: 360,
};

