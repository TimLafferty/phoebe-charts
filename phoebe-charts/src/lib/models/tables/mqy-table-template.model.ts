// =============================================================================
// MQY Table Template Model
// Period-over-period comparison table interfaces
// =============================================================================

// -----------------------------------------------------------------------------
// Period Comparison Types
// -----------------------------------------------------------------------------

/**
 * Period comparison data structure
 */
export interface MqyPeriodComparison {
  value: number;              // Previous period's raw value
  percentage: number | null;  // Percentage change (null if calculation not possible)
}

/**
 * Single row/metric in the table
 */
export interface MqyRow {
  id: string;                              // Unique identifier for trackBy
  label: string;                           // Display label for the metric
  rank?: number;                           // Optional ranking position
  current: number;                         // Current period value
  momComparison: MqyPeriodComparison;      // Month-over-Month data
  qoqComparison: MqyPeriodComparison;      // Quarter-over-Quarter data
  yoyComparison: MqyPeriodComparison;      // Year-over-Year data
  isMonetary?: boolean;                    // Format as currency if true
  tooltip?: string;                        // Optional hover tooltip text
}

/**
 * Group of related rows
 */
export interface MqyGroup {
  id: string;                 // Unique group identifier
  label: string;              // Group display name
  icon?: string;              // Optional FontAwesome icon class
  rows: MqyRow[];             // Array of metric rows
}

// -----------------------------------------------------------------------------
// Header & Footer Types
// -----------------------------------------------------------------------------

/**
 * Column header configuration
 */
export interface MqyPeriodHeader {
  id: 'mom' | 'qoq' | 'yoy';  // Period type identifier
  label: string;               // Display label (e.g., "MoM", "QoQ", "YoY")
}

/**
 * Date range for footer display
 */
export interface MqyDateRange {
  start: string;  // ISO date string (YYYY-MM-DD)
  end: string;    // ISO date string (YYYY-MM-DD)
}

export interface MqyPeriodDateRange {
  current: MqyDateRange;   // Current period dates
  previous: MqyDateRange;  // Comparison period dates
}

export interface MqyFooterDates {
  mom: MqyPeriodDateRange;
  qoq: MqyPeriodDateRange;
  yoy: MqyPeriodDateRange;
}

// -----------------------------------------------------------------------------
// Configuration Types
// -----------------------------------------------------------------------------

/**
 * Column width configuration
 */
export interface MqyColumnWidths {
  metric?: string;   // Width for metric label column (e.g., '30%')
  current?: string;  // Width for current value column (e.g., '18%')
  delta?: string;    // Width for each comparison column (e.g., '17.33%')
}

/**
 * Complete configuration object
 */
export interface MqyConfig {
  periodHeaders?: MqyPeriodHeader[];
  columnWidths?: MqyColumnWidths;
  rowLabel?: string;
  currentLabel?: string;
  footerLabel?: string;
  neutralThreshold?: number;  // Percentage threshold for neutral styling
}

// -----------------------------------------------------------------------------
// Default Configuration
// -----------------------------------------------------------------------------

export const DEFAULT_MQY_CONFIG: MqyConfig = {
  periodHeaders: [
    { id: 'mom', label: 'MoM' },
    { id: 'qoq', label: 'QoQ' },
    { id: 'yoy', label: 'YoY' }
  ],
  columnWidths: {
    metric: '30%',
    current: '18%',
    delta: '17.33%'
  },
  rowLabel: 'Metric',
  currentLabel: 'Current',
  footerLabel: 'Period Comparisons',
  neutralThreshold: 2
};
