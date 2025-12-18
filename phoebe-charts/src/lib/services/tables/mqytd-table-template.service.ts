// =============================================================================
// MQYTD Table Template Service
// Factory methods and utilities for MQYTD period-to-date benchmark tables
// =============================================================================

import { Injectable } from '@angular/core';
import {
  MqytdRow,
  MqytdGroup,
  MqytdPeriodComparison,
  MqytdDateRange,
  MqytdFooterDates
} from '../../models/tables/mqytd-table-template.model';
import { calculatePercentageChange } from '../../utils/format.utils';

// -----------------------------------------------------------------------------
// Service Input Interfaces
// -----------------------------------------------------------------------------

/**
 * Input for creating rows - NOTE: separate fields for each period
 */
export interface MqytdRowInput {
  id: string;
  label: string;
  mtd: number;
  mtdPrevious: number;
  mtdPercentage: number | null;
  qtd: number;
  qtdPrevious: number;
  qtdPercentage: number | null;
  ytd: number;
  ytdPrevious: number;
  ytdPercentage: number | null;
  isMonetary?: boolean;
  tooltip?: string;
}

export interface MqytdGroupInput {
  id: string;
  label: string;
  icon?: string;
  rows: MqytdRowInput[];
}

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

@Injectable({ providedIn: 'root' })
export class MqytdTableTemplateService {

  // ---------------------------------------------------------------------------
  // Factory Methods
  // ---------------------------------------------------------------------------

  /**
   * Create a single row from input data
   */
  createRow(input: MqytdRowInput): MqytdRow {
    return {
      id: input.id,
      label: input.label,
      mtd: input.mtd,
      mtdComparison: { value: input.mtdPrevious, percentage: input.mtdPercentage },
      qtd: input.qtd,
      qtdComparison: { value: input.qtdPrevious, percentage: input.qtdPercentage },
      ytd: input.ytd,
      ytdComparison: { value: input.ytdPrevious, percentage: input.ytdPercentage },
      isMonetary: input.isMonetary,
      tooltip: input.tooltip
    };
  }

  /**
   * Create a group with its rows from input data
   */
  createGroup(input: MqytdGroupInput): MqytdGroup {
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
  createGroups(inputs: MqytdGroupInput[]): MqytdGroup[] {
    return inputs.map(input => this.createGroup(input));
  }

  // ---------------------------------------------------------------------------
  // Comparison Factory
  // ---------------------------------------------------------------------------

  /**
   * Create a period comparison object from current and previous values
   */
  createComparison(current: number, previous: number): MqytdPeriodComparison {
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
    mtdCurrent: MqytdDateRange,
    mtdPrevious: MqytdDateRange,
    qtdCurrent: MqytdDateRange,
    qtdPrevious: MqytdDateRange,
    ytdCurrent: MqytdDateRange,
    ytdPrevious: MqytdDateRange
  ): MqytdFooterDates {
    return {
      mtd: { current: mtdCurrent, previous: mtdPrevious },
      qtd: { current: qtdCurrent, previous: qtdPrevious },
      ytd: { current: ytdCurrent, previous: ytdPrevious }
    };
  }

  // ---------------------------------------------------------------------------
  // Date Range Calculations - MTD
  // ---------------------------------------------------------------------------

  /**
   * Get current Month-to-Date range
   * @param anchorDate - ISO date string (YYYY-MM-DD)
   */
  getCurrentMTDRange(anchorDate: string): MqytdDateRange {
    const anchor = new Date(anchorDate);
    const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    return this.formatDateRange(start, anchor);
  }

  /**
   * Get previous year Month-to-Date range
   * @param anchorDate - ISO date string (YYYY-MM-DD)
   * @param comparisonType - 'comparative' (week-position matching) or 'fiscal' (simple year-back)
   */
  getPreviousMTDRange(
    anchorDate: string,
    comparisonType: 'comparative' | 'fiscal' = 'fiscal'
  ): MqytdDateRange {
    const anchor = new Date(anchorDate);

    if (comparisonType === 'fiscal') {
      // Simple: same date, previous year
      const start = new Date(anchor.getFullYear() - 1, anchor.getMonth(), 1);
      const end = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate());
      return this.formatDateRange(start, end);
    }

    // Comparative: week-position matching
    const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    const weeksIntoMonth = this.getWeeksDifference(monthStart, anchor);

    // Previous year anchor + 1 day (matches SQL SPROC logic)
    const pyAnchor = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate() + 1);
    const pyMonthStart = new Date(pyAnchor.getFullYear(), pyAnchor.getMonth(), 1);

    // Subtract same number of weeks
    const pyEnd = new Date(pyAnchor);
    pyEnd.setDate(pyEnd.getDate() - (weeksIntoMonth * 7));

    return this.formatDateRange(pyMonthStart, pyEnd);
  }

  // ---------------------------------------------------------------------------
  // Date Range Calculations - QTD
  // ---------------------------------------------------------------------------

  /**
   * Get current Quarter-to-Date range
   * @param anchorDate - ISO date string (YYYY-MM-DD)
   * @param fiscalStartMonth - Month number (1-12), default 1 (January)
   */
  getCurrentQTDRange(anchorDate: string, fiscalStartMonth: number = 1): MqytdDateRange {
    const anchor = new Date(anchorDate);
    const quarterStart = this.getQuarterStart(anchor, fiscalStartMonth);
    return this.formatDateRange(quarterStart, anchor);
  }

  /**
   * Get previous year Quarter-to-Date range
   */
  getPreviousQTDRange(
    anchorDate: string,
    comparisonType: 'comparative' | 'fiscal' = 'fiscal',
    fiscalStartMonth: number = 1
  ): MqytdDateRange {
    const anchor = new Date(anchorDate);

    if (comparisonType === 'fiscal') {
      // Same position in quarter, previous year
      const quarterStart = this.getQuarterStart(anchor, fiscalStartMonth);
      const pyQuarterStart = new Date(quarterStart.getFullYear() - 1, quarterStart.getMonth(), 1);
      const pyEnd = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate());
      return this.formatDateRange(pyQuarterStart, pyEnd);
    }

    // Comparative: week-position matching within quarter
    const quarterStart = this.getQuarterStart(anchor, fiscalStartMonth);
    const weeksIntoQuarter = this.getWeeksDifference(quarterStart, anchor);

    const pyAnchor = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate() + 1);
    const pyQuarterStart = this.getQuarterStart(pyAnchor, fiscalStartMonth);

    const pyEnd = new Date(pyAnchor);
    pyEnd.setDate(pyEnd.getDate() - (weeksIntoQuarter * 7));

    return this.formatDateRange(pyQuarterStart, pyEnd);
  }

  // ---------------------------------------------------------------------------
  // Date Range Calculations - YTD
  // ---------------------------------------------------------------------------

  /**
   * Get current Year-to-Date range
   * @param anchorDate - ISO date string (YYYY-MM-DD)
   * @param fiscalStartMonth - Month number (1-12), default 1 (January)
   */
  getCurrentYTDRange(anchorDate: string, fiscalStartMonth: number = 1): MqytdDateRange {
    const anchor = new Date(anchorDate);
    const start = this.getFiscalYearStart(anchor, fiscalStartMonth);
    return this.formatDateRange(start, anchor);
  }

  /**
   * Get previous year Year-to-Date range
   */
  getPreviousYTDRange(
    anchorDate: string,
    comparisonType: 'comparative' | 'fiscal' = 'fiscal',
    fiscalStartMonth: number = 1
  ): MqytdDateRange {
    const anchor = new Date(anchorDate);

    if (comparisonType === 'fiscal') {
      // Same position in fiscal year, previous year
      const fyStart = this.getFiscalYearStart(anchor, fiscalStartMonth);
      const pyFyStart = new Date(fyStart.getFullYear() - 1, fyStart.getMonth(), 1);
      const pyEnd = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate());
      return this.formatDateRange(pyFyStart, pyEnd);
    }

    // Comparative: week-position matching within fiscal year
    const fyStart = this.getFiscalYearStart(anchor, fiscalStartMonth);
    const weeksIntoYear = this.getWeeksDifference(fyStart, anchor);

    const pyAnchor = new Date(anchor.getFullYear() - 1, anchor.getMonth(), anchor.getDate() + 1);
    const pyFyStart = this.getFiscalYearStart(pyAnchor, fiscalStartMonth);

    const pyEnd = new Date(pyAnchor);
    pyEnd.setDate(pyEnd.getDate() - (weeksIntoYear * 7));

    return this.formatDateRange(pyFyStart, pyEnd);
  }

  // ---------------------------------------------------------------------------
  // Private Helpers
  // ---------------------------------------------------------------------------

  /**
   * Calculate weeks difference between two dates
   */
  private getWeeksDifference(startDate: Date, endDate: Date): number {
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor((endDate.getTime() - startDate.getTime()) / msPerWeek);
  }

  /**
   * Get the start of the fiscal year containing the anchor date
   */
  private getFiscalYearStart(anchorDate: Date, fiscalStartMonth: number = 1): Date {
    const fiscalMonthIndex = fiscalStartMonth - 1; // Convert to 0-based
    const year = anchorDate.getMonth() >= fiscalMonthIndex
      ? anchorDate.getFullYear()
      : anchorDate.getFullYear() - 1;
    return new Date(year, fiscalMonthIndex, 1);
  }

  /**
   * Get the start of the quarter containing the anchor date
   */
  private getQuarterStart(anchorDate: Date, fiscalStartMonth: number = 1): Date {
    const fiscalMonthIndex = fiscalStartMonth - 1;
    const adjustedMonth = (anchorDate.getMonth() - fiscalMonthIndex + 12) % 12;
    const quarterIndex = Math.floor(adjustedMonth / 3);
    const quarterStartMonth = (fiscalMonthIndex + quarterIndex * 3) % 12;

    let year = anchorDate.getFullYear();
    if (quarterStartMonth > anchorDate.getMonth()) {
      year--;
    }

    return new Date(year, quarterStartMonth, 1);
  }

  /**
   * Format a Date object to ISO date string and create DateRange
   */
  formatDateRange(start: Date, end: Date): MqytdDateRange {
    return {
      start: this.formatDateISO(start),
      end: this.formatDateISO(end)
    };
  }

  /**
   * Format a Date object to ISO date string (YYYY-MM-DD)
   */
  private formatDateISO(date: Date): string {
    return date.toISOString().split('T')[0];
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
    mtdCurrent: number,
    mtdPrevious: number,
    qtdCurrent: number,
    qtdPrevious: number,
    ytdCurrent: number,
    ytdPrevious: number,
    isMonetary: boolean = false,
    comparisonLabel: string = 'vs PY'
  ): string {
    const formatVal = (val: number) => isMonetary ? `$${val.toLocaleString()}` : val.toLocaleString();
    const lines = [
      `${label}`,
      `MTD: ${formatVal(mtdCurrent)} ${comparisonLabel} ${formatVal(mtdPrevious)}`,
      `QTD: ${formatVal(qtdCurrent)} ${comparisonLabel} ${formatVal(qtdPrevious)}`,
      `YTD: ${formatVal(ytdCurrent)} ${comparisonLabel} ${formatVal(ytdPrevious)}`
    ];
    return lines.join('\n');
  }
}
