export interface ChartFonts {
  titleFont?: string;
  subtitleFont?: string;
  labelFont?: string;
  tickFont?: string;
  legendFont?: string;
  tooltipFont?: string;
}

export interface ChartFontSizes {
  titleSize?: number;
  subtitleSize?: number;
  labelSize?: number;
  tickSize?: number;
  legendSize?: number;
  tooltipSize?: number;
}

export interface ChartColors {
  primary?: string;
  secondary?: string;
  background?: string;
  gridColor?: string;
  axisColor?: string;
  textColor?: string;
  tooltipBackground?: string;
  tooltipText?: string;
  seriesColors?: string[];
}

export interface ChartTheme {
  name: string;
  fonts?: ChartFonts;
  fontSizes?: ChartFontSizes;
  colors?: ChartColors;
  borderRadius?: number;
  strokeWidth?: number;
  opacity?: number;
  animationDuration?: number;
}

export const DEFAULT_FONTS: ChartFonts = {
  titleFont: 'system-ui, -apple-system, sans-serif',
  subtitleFont: 'system-ui, -apple-system, sans-serif',
  labelFont: 'system-ui, -apple-system, sans-serif',
  tickFont: 'system-ui, -apple-system, sans-serif',
  legendFont: 'system-ui, -apple-system, sans-serif',
  tooltipFont: 'system-ui, -apple-system, sans-serif',
};

export const DEFAULT_FONT_SIZES: ChartFontSizes = {
  titleSize: 20,
  subtitleSize: 14,
  labelSize: 12,
  tickSize: 11,
  legendSize: 12,
  tooltipSize: 12,
};

export const DEFAULT_COLORS: ChartColors = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  background: '#ffffff',
  gridColor: '#e5e7eb',
  axisColor: '#6b7280',
  textColor: '#1f2937',
  tooltipBackground: '#1f2937',
  tooltipText: '#ffffff',
  seriesColors: [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#06b6d4',
    '#ef4444',
    '#6366f1',
  ],
};

export const DEFAULT_THEME: ChartTheme = {
  name: 'default',
  fonts: DEFAULT_FONTS,
  fontSizes: DEFAULT_FONT_SIZES,
  colors: DEFAULT_COLORS,
  borderRadius: 4,
  strokeWidth: 2,
  opacity: 1,
  animationDuration: 1000,
};

export const DARK_THEME: ChartTheme = {
  name: 'dark',
  fonts: DEFAULT_FONTS,
  fontSizes: DEFAULT_FONT_SIZES,
  colors: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    background: '#1f2937',
    gridColor: '#374151',
    axisColor: '#9ca3af',
    textColor: '#f9fafb',
    tooltipBackground: '#374151',
    tooltipText: '#f9fafb',
    seriesColors: [
      '#60a5fa',
      '#a78bfa',
      '#f472b6',
      '#fbbf24',
      '#34d399',
      '#22d3ee',
      '#f87171',
      '#818cf8',
    ],
  },
  borderRadius: 4,
  strokeWidth: 2,
  opacity: 1,
  animationDuration: 1000,
};

