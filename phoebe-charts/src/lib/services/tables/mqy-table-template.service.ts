// =============================================================================
// MQY Table Template Service
// Factory methods and utilities for MQY benchmark tables
// =============================================================================

import { Injectable } from '@angular/core';
import {
  MqyRow,
  MqyGroup,
  MqyPeriodComparison,
  MqyDateRange,
  MqyFooterDates
} from '../../models/tables/mqy-table-template.model';
import { calculatePercentageChange } from '../../utils/format.utils';

// -----------------------------------------------------------------------------
// Service Input Interfaces
// -----------------------------------------------------------------------------

/**
 * Simplified input for creating rows (raw data format)
 */
export interface MqyRowInput {
  id: string;
  label: string;
  rank?: number;
  current: number;
  momPrevious: number;
  momPercentage: number | null;
  qoqPrevious: number;
  qoqPercentage: number | null;
  yoyPrevious: number;
  yoyPercentage: number | null;
  isMonetary?: boolean;
  tooltip?: string;
}

export interface MqyGroupInput {
  id: string;
  label: string;
  icon?: string;
  rows: MqyRowInput[];
}

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class MqyTableTemplateService {

  // ---------------------------------------------------------------------------
  // Factory Methods
  // ---------------------------------------------------------------------------

  /**
   * Create a single row from input data
   */
  createRow(input: MqyRowInput): MqyRow {
    return {
      id: input.id,
      label: input.label,
      rank: input.rank,
      current: input.current,
      momComparison: { value: input.momPrevious, percentage: input.momPercentage },
      qoqComparison: { value: input.qoqPrevious, percentage: input.qoqPercentage },
      yoyComparison: { value: input.yoyPrevious, percentage: input.yoyPercentage },
      isMonetary: input.isMonetary,
      tooltip: input.tooltip
    };
  }

  /**
   * Create a group with its rows from input data
   */
  createGroup(input: MqyGroupInput): MqyGroup {
    return {
      id: input.id,
      label: input.label,
      icon: input.icon,
      rows: input.rows.map(row => this.createRow(row))
    };
  }

  /**
   * Create multiple groups from input data
   */
  createGroups(inputs: MqyGroupInput[]): MqyGroup[] {
    return inputs.map(input => this.createGroup(input));
  }

  // ---------------------------------------------------------------------------
  // Comparison Factory
  // ---------------------------------------------------------------------------

  /**
   * Create a period comparison object from current and previous values
   */
  createComparison(current: number, previous: number): MqyPeriodComparison {
    return {
      value: previous,
      percentage: calculatePercentageChange(current, previous)
    };
  }

  // ---------------------------------------------------------------------------
  // Footer Dates Factory
  // ---------------------------------------------------------------------------

  /**
   * Create footer dates structure from individual date ranges
   */
  createFooterDates(
    momCurrent: MqyDateRange,
    momPrevious: MqyDateRange,
    qoqCurrent: MqyDateRange,
    qoqPrevious: MqyDateRange,
    yoyCurrent: MqyDateRange,
    yoyPrevious: MqyDateRange
  ): MqyFooterDates {
    return {
      mom: { current: momCurrent, previous: momPrevious },
      qoq: { current: qoqCurrent, previous: qoqPrevious },
      yoy: { current: yoyCurrent, previous: yoyPrevious }
    };
  }

  // ---------------------------------------------------------------------------
  // Date Range Calculations
  // ---------------------------------------------------------------------------

  /**
   * Get the current month's date range based on anchor month
   * @param anchorMonth - ISO date string (YYYY-MM-DD) representing the anchor month
   */
  getCurrentMonthRange(anchorMonth: string): MqyDateRange {
    const date = new Date(anchorMonth);
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  /**
   * Get the previous month's date range based on anchor month
   */
  getPreviousMonthRange(anchorMonth: string): MqyDateRange {
    const date = new Date(anchorMonth);
    const start = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const end = new Date(date.getFullYear(), date.getMonth(), 0);
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  /**
   * Get the current quarter's date range based on anchor month
   */
  getCurrentQuarterRange(anchorMonth: string): MqyDateRange {
    const date = new Date(anchorMonth);
    const quarter = Math.floor(date.getMonth() / 3);
    const start = new Date(date.getFullYear(), quarter * 3, 1);
    const end = new Date(date.getFullYear(), (quarter + 1) * 3, 0);
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  /**
   * Get the previous quarter's date range based on anchor month
   */
  getPreviousQuarterRange(anchorMonth: string): MqyDateRange {
    const date = new Date(anchorMonth);
    const quarter = Math.floor(date.getMonth() / 3);
    const prevQuarter = quarter === 0 ? 3 : quarter - 1;
    const year = quarter === 0 ? date.getFullYear() - 1 : date.getFullYear();
    const start = new Date(year, prevQuarter * 3, 1);
    const end = new Date(year, (prevQuarter + 1) * 3, 0);
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  /**
   * Get the same month last year's date range based on anchor month
   */
  getSameMonthLastYearRange(anchorMonth: string): MqyDateRange {
    const date = new Date(anchorMonth);
    const start = new Date(date.getFullYear() - 1, date.getMonth(), 1);
    const end = new Date(date.getFullYear() - 1, date.getMonth() + 1, 0);
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  // ---------------------------------------------------------------------------
  // Utility Methods
  // ---------------------------------------------------------------------------

  /**
   * Calculate percentage change between two values
   */
  calculatePercentageChange(current: number, previous: number): number | null {
    return calculatePercentageChange(current, previous);
  }

  /**
   * Generate a multi-line tooltip for a metric row
   */
  generateTooltip(
    label: string,
    current: number,
    momPrevious: number,
    qoqPrevious: number,
    yoyPrevious: number,
    isMonetary: boolean = false,
    comparisonLabel: string = 'Comparison'
  ): string {
    const formatVal = (val: number) => isMonetary ? `$${val.toLocaleString()}` : val.toLocaleString();
    const lines = [
      `${label}`,
      `Current: ${formatVal(current)}`,
      `${comparisonLabel}:`,
      `  MoM: ${formatVal(momPrevious)}`,
      `  QoQ: ${formatVal(qoqPrevious)}`,
      `  YoY: ${formatVal(yoyPrevious)}`
    ];
    return lines.join('\n');
  }

  /**
   * Format a Date object to ISO date string (YYYY-MM-DD)
   */
  private formatDateISO(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
