export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartDimensions {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number;
  margins?: ChartMargins;
  padding?: ChartPadding;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
}

export const DEFAULT_MARGINS: ChartMargins = {
  top: 20,
  right: 30,
  bottom: 40,
  left: 50,
};

export const DEFAULT_PADDING: ChartPadding = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const DEFAULT_CHART_DIMENSIONS: ChartDimensions = {
  width: 600,
  height: 400,
  minWidth: 200,
  minHeight: 150,
  maxWidth: undefined,
  maxHeight: undefined,
  aspectRatio: undefined,
  margins: DEFAULT_MARGINS,
  padding: DEFAULT_PADDING,
  responsive: true,
  maintainAspectRatio: false,
};

