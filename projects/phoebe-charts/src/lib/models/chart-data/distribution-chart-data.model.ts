export interface DistributionDataPoint {
  value: number;
  frequency?: number;
  label?: string;
  metadata?: Record<string, any>;
}

export interface DistributionChartData {
  data: DistributionDataPoint[];
  type?: 'histogram' | 'box-plot' | 'violin' | 'density';
  bins?: number;
  bandwidth?: number;
}

export const DEFAULT_DISTRIBUTION_CHART_DATA: Partial<DistributionChartData> = {
  type: 'histogram',
  bins: 10,
  bandwidth: 1,
};

