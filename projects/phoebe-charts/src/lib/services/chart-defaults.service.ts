import { Injectable } from '@angular/core';
import {
  ChartTheme,
  ChartColors,
  ChartFonts,
  ChartFontSizes,
  DEFAULT_THEME,
  DARK_THEME,
} from '../models/chart-utilities/chart-themes.model';
import {
  ChartDimensions,
  ChartMargins,
  DEFAULT_CHART_DIMENSIONS,
  DEFAULT_MARGINS,
} from '../models/chart-utilities/chart-dimensions.model';
import {
  ChartConfiguration,
  DEFAULT_CHART_CONFIGURATION,
} from '../models/chart-utilities/chart-configuration.model';

@Injectable({
  providedIn: 'root',
})
export class ChartDefaultsService {
  private currentTheme: ChartTheme = DEFAULT_THEME;

  // Font Defaults
  getFontFamily(): string {
    return this.currentTheme.fonts?.titleFont || 'system-ui, -apple-system, sans-serif';
  }

  getTitleFontSize(): number {
    return this.currentTheme.fontSizes?.titleSize || 20;
  }

  getSubtitleFontSize(): number {
    return this.currentTheme.fontSizes?.subtitleSize || 14;
  }

  getLabelFontSize(): number {
    return this.currentTheme.fontSizes?.labelSize || 12;
  }

  getTickFontSize(): number {
    return this.currentTheme.fontSizes?.tickSize || 11;
  }

  getLegendFontSize(): number {
    return this.currentTheme.fontSizes?.legendSize || 12;
  }

  getTooltipFontSize(): number {
    return this.currentTheme.fontSizes?.tooltipSize || 12;
  }

  // Color Defaults
  getPrimaryColor(): string {
    return this.currentTheme.colors?.primary || '#3b82f6';
  }

  getSecondaryColor(): string {
    return this.currentTheme.colors?.secondary || '#8b5cf6';
  }

  getBackgroundColor(): string {
    return this.currentTheme.colors?.background || '#ffffff';
  }

  getGridColor(): string {
    return this.currentTheme.colors?.gridColor || '#e5e7eb';
  }

  getAxisColor(): string {
    return this.currentTheme.colors?.axisColor || '#6b7280';
  }

  getTextColor(): string {
    return this.currentTheme.colors?.textColor || '#1f2937';
  }

  getTooltipBackgroundColor(): string {
    return this.currentTheme.colors?.tooltipBackground || '#1f2937';
  }

  getTooltipTextColor(): string {
    return this.currentTheme.colors?.tooltipText || '#ffffff';
  }

  getSeriesColors(): string[] {
    return this.currentTheme.colors?.seriesColors || [
      '#3b82f6',
      '#8b5cf6',
      '#ec4899',
      '#f59e0b',
      '#10b981',
      '#06b6d4',
      '#ef4444',
      '#6366f1',
    ];
  }

  getSeriesColor(index: number): string {
    const colors = this.getSeriesColors();
    return colors[index % colors.length];
  }

  // Animation Defaults
  getAnimationDuration(): number {
    return this.currentTheme.animationDuration || 1000;
  }

  getAnimationEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.enableAnimation || false;
  }

  // Dimension Defaults
  getDefaultWidth(): number {
    return DEFAULT_CHART_DIMENSIONS.width || 600;
  }

  getDefaultHeight(): number {
    return DEFAULT_CHART_DIMENSIONS.height || 400;
  }

  getDefaultMargins(): ChartMargins {
    return DEFAULT_MARGINS;
  }

  getDefaultDimensions(): ChartDimensions {
    return DEFAULT_CHART_DIMENSIONS;
  }

  // Style Defaults
  getStrokeWidth(): number {
    return this.currentTheme.strokeWidth || 2;
  }

  getBorderRadius(): number {
    return this.currentTheme.borderRadius || 4;
  }

  getOpacity(): number {
    return this.currentTheme.opacity || 1;
  }

  // Configuration Defaults
  getDefaultConfiguration(): ChartConfiguration {
    return DEFAULT_CHART_CONFIGURATION;
  }

  // Theme Management
  getCurrentTheme(): ChartTheme {
    return this.currentTheme;
  }

  setTheme(theme: ChartTheme): void {
    this.currentTheme = theme;
  }

  setLightTheme(): void {
    this.currentTheme = DEFAULT_THEME;
  }

  setDarkTheme(): void {
    this.currentTheme = DARK_THEME;
  }

  setCustomTheme(customTheme: Partial<ChartTheme>): void {
    this.currentTheme = {
      ...this.currentTheme,
      ...customTheme,
      fonts: { ...this.currentTheme.fonts, ...customTheme.fonts },
      fontSizes: { ...this.currentTheme.fontSizes, ...customTheme.fontSizes },
      colors: { ...this.currentTheme.colors, ...customTheme.colors },
    };
  }

  // Grid Defaults
  isGridEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayGrid || true;
  }

  isGridXEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayGridX || true;
  }

  isGridYEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayGridY || true;
  }

  // Axis Defaults
  isXAxisEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayXAxis || true;
  }

  isYAxisEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayYAxis || true;
  }

  isXAxisLabelEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayXAxisLabel || true;
  }

  isYAxisLabelEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.displayYAxisLabel || true;
  }

  // Interaction Defaults
  isTooltipEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.enableTooltip || false;
  }

  isHoverEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.enableHover || false;
  }

  isZoomEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.enableZoom || false;
  }

  isPanEnabled(): boolean {
    return DEFAULT_CHART_CONFIGURATION.enablePan || false;
  }

  // Responsive Defaults
  isResponsive(): boolean {
    return DEFAULT_CHART_DIMENSIONS.responsive || true;
  }

  // Reset to defaults
  resetToDefaults(): void {
    this.currentTheme = DEFAULT_THEME;
  }
}

