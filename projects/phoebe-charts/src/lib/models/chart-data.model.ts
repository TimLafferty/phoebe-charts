export interface DataPoint {
  x: number | Date;
  y: number;
}

export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  margins?: ChartMargins;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  animate?: boolean;
}

export const DEFAULT_MARGINS: ChartMargins = {
  top: 20,
  right: 30,
  bottom: 40,
  left: 50
};

export const DEFAULT_CONFIG: ChartConfig = {
  width: 600,
  height: 400,
  margins: DEFAULT_MARGINS,
  showGrid: true,
  animate: true
};
