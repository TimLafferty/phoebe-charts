// =============================================================================
// MQYTD Table Template Model
// Period-to-date comparison table interfaces (MTD, QTD, YTD)
// =============================================================================

// -----------------------------------------------------------------------------
// Period Comparison Types
// -----------------------------------------------------------------------------

/**
 * Period comparison data structure
 */
export interface MqytdPeriodComparison {
  value: number;              // Previous period's raw value
  percentage: number | null;  // Percentage change (null if calculation not possible)
}

/**
 * Single row/metric in the table
 * NOTE: 3 current values (mtd, qtd, ytd), not 1 like MQY
 */
export interface MqytdRow {
  id: string;                                  // Unique identifier for trackBy
  label: string;                               // Display label for the metric
  mtd: number;                                 // Month-to-Date current value
  mtdComparison: MqytdPeriodComparison;        // vs Previous Year MTD
  qtd: number;                                 // Quarter-to-Date current value
  qtdComparison: MqytdPeriodComparison;        // vs Previous Year QTD
  ytd: number;                                 // Year-to-Date current value
  ytdComparison: MqytdPeriodComparison;        // vs Previous Year YTD
  isMonetary?: boolean;                        // Format as currency if true
  tooltip?: string;                            // Optional hover tooltip text
}

/**
 * Group of related rows
 */
export interface MqytdGroup {
  id: string;                 // Unique group identifier
  label: string;              // Group display name
  icon?: string;              // Optional FontAwesome icon class
  rows: MqytdRow[];           // Array of metric rows
}

// -----------------------------------------------------------------------------
// Header & Footer Types
// -----------------------------------------------------------------------------

/**
 * Period header configuration
 */
export interface MqytdPeriodHeader {
  id: 'mtd' | 'qtd' | 'ytd';  // Period type identifier
  label: string;               // Display label (e.g., "Month-to-Date")
}

/**
 * Date range for footer display
 */
export interface MqytdDateRange {
  start: string;  // ISO date string (YYYY-MM-DD)
  end: string;    // ISO date string (YYYY-MM-DD)
}

export interface MqytdPeriodDateRange {
  current: MqytdDateRange;   // Current period dates
  previous: MqytdDateRange;  // Comparison period dates
}

export interface MqytdFooterDates {
  mtd: MqytdPeriodDateRange;
  qtd: MqytdPeriodDateRange;
  ytd: MqytdPeriodDateRange;
}

// -----------------------------------------------------------------------------
// Configuration Types
// -----------------------------------------------------------------------------

/**
 * Column width configuration
 * NOTE: Different structure from MQY - delta and values columns
 */
export interface MqytdColumnWidths {
  metric?: string;   // Width for metric label column
  delta?: string;    // Width for delta percentage column
  values?: string;   // Width for current/previous values column
}

/**
 * Complete configuration object
 */
export interface MqytdConfig {
  periodHeaders?: MqytdPeriodHeader[];
  columnWidths?: MqytdColumnWidths;
  deltaLabel?: string;
  currentLabel?: string;
  previousLabel?: string;
  footerLabel?: string;
  neutralThreshold?: number;  // Percentage threshold for neutral styling
}

// -----------------------------------------------------------------------------
// Default Configuration
// -----------------------------------------------------------------------------

export const DEFAULT_MQYTD_CONFIG: MqytdConfig = {
  periodHeaders: [
    { id: 'mtd', label: 'Month-to-Date' },
    { id: 'qtd', label: 'Quarter-to-Date' },
    { id: 'ytd', label: 'Year-to-Date' }
  ],
  columnWidths: {
    metric: '28%',
    delta: '12%',
    values: '12%'
  },
  deltaLabel: 'Delta %',
  currentLabel: 'Current',
  previousLabel: 'Previous',
  footerLabel: 'Period Date Constraints',
  neutralThreshold: 2
};
