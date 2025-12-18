// =============================================================================
// Format Utilities
// Phoebe Charts - Number and percentage formatting utilities
// =============================================================================

/**
 * Format a number with K/M/B suffix based on magnitude
 */
export function formatNumberWithSuffix(value: number): string {
  if (value === 0) return '0';
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1_000_000_000) return `${sign}${(absValue / 1_000_000_000).toFixed(1)}B`;
  if (absValue >= 1_000_000) return `${sign}${(absValue / 1_000_000).toFixed(1)}M`;
  if (absValue >= 1_000) return `${sign}${(absValue / 1_000).toFixed(1)}K`;
  return `${sign}${absValue.toFixed(0)}`;
}

/**
 * Format a number as currency with suffix
 */
export function formatCurrency(value: number): string {
  return '$' + formatNumberWithSuffix(value);
}

/**
 * Format a number with suffix (alias for formatNumberWithSuffix)
 */
export function formatNumber(value: number): string {
  return formatNumberWithSuffix(value);
}

/**
 * Format a value as currency or number based on isMonetary flag
 */
export function formatValue(value: number, isMonetary: boolean = false): string {
  return isMonetary ? formatCurrency(value) : formatNumber(value);
}

/**
 * Format a percentage with sign prefix
 */
export function formatPercentage(percentage: number | null): string {
  if (percentage === null || percentage === undefined) return 'N/A';
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
}

/**
 * Get CSS class for percentage based on value and threshold
 */
export function getPercentageClass(percentage: number | null, threshold: number = 2): string {
  if (percentage === null || percentage === undefined) return 'text-muted';
  if (Math.abs(percentage) < threshold) return 'text-muted';
  return percentage > 0 ? 'text-success' : 'text-danger';
}

/**
 * Get FontAwesome icon class for percentage indicator
 */
export function getPercentageIcon(percentage: number | null, threshold: number = 2): string {
  if (percentage === null || percentage === undefined) return 'fa-solid fa-minus';
  if (Math.abs(percentage) < threshold) return 'fa-solid fa-minus';
  return percentage > 0
    ? 'fa-solid fa-caret-up'
    : 'fa-solid fa-caret-down';
}

/**
 * Calculate percentage change between current and previous values
 */
export function calculatePercentageChange(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}
