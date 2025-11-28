export interface ChartContext {
  chartTitle?: string;
  chartSubtitle?: string;
  chartFooter?: string;
}

export const DEFAULT_CHART_CONTEXT: ChartContext = {
  chartTitle: undefined,
  chartSubtitle: undefined,
  chartFooter: undefined,
};

