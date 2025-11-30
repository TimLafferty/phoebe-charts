export interface BarChartDataPoint {
  category: string;
  value: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface BarChartSeries {
  id: string;
  name: string;
  data: BarChartDataPoint[];
  color?: string;
  visible?: boolean;
}

export interface BarChartData {
  series: BarChartSeries[];
  orientation?: 'vertical' | 'horizontal';
  stacked?: boolean;
  grouped?: boolean;
}

export const DEFAULT_BAR_CHART_SERIES: Partial<BarChartSeries> = {
  color: '#3b82f6',
  visible: true,
};

export const DEFAULT_BAR_CHART_DATA: Partial<BarChartData> = {
  orientation: 'vertical',
  stacked: false,
  grouped: false,
};

