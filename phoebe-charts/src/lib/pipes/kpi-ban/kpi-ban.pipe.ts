import { Pipe, PipeTransform } from '@angular/core';

export type MetricType = 'numeric' | 'percentage' | 'currency';

/**
 * KPI BAN (Big Ass Number) Pipe
 * Formats numbers based on magnitude with appropriate abbreviations.
 *
 * Supports different metric types:
 * - 'numeric' (default): Abbreviates large numbers (K, M)
 * - 'percentage': Formats as percentage with % suffix
 * - 'currency': Adds $ prefix to abbreviated numbers
 *
 * Formatting rules for numeric/currency (based on absolute magnitude):
 * - |value| < 1: max 3 decimal places (e.g., 0.123)
 * - |value| < 100: 1 decimal place (e.g., 45.6)
 * - |value| < 1,000: 0 decimal places (e.g., 456)
 * - |value| < 10,000: divide by 1000, 2 decimal places (e.g., 4.56K)
 * - |value| < 100,000: divide by 1000, 1 decimal place (e.g., 45.6K)
 * - |value| < 1,000,000: divide by 1000, 0 decimal places (e.g., 456K)
 * - |value| < 100,000,000: divide by 1000000, 1 decimal place (e.g., 45.6M)
 * - |value| >= 100,000,000: divide by 1000000, 0 decimal places (e.g., 456M)
 *
 * Formatting rules for percentage (based on absolute value):
 * - |value| < 1: 3 decimal places (e.g., 0.123%)
 * - |value| < 10: 2 decimal places (e.g., 5.67%)
 * - |value| >= 10: 1 decimal place (e.g., 45.6%)
 */
@Pipe({
  name: 'KpiBan',
  standalone: true,
})
export class KpiBanPipe implements PipeTransform {
  transform(value: number | null | undefined, metricType: MetricType = 'numeric'): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    switch (metricType) {
      case 'percentage':
        return this.formatPercentage(value);
      case 'currency':
        return this.formatCurrency(value);
      case 'numeric':
      default:
        return this.formatNumeric(value);
    }
  }

  private formatNumeric(value: number): string {
    const magnitude = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (magnitude < 1) {
      return sign + this.formatDecimal(magnitude, 3);
    }
    if (magnitude < 100) {
      return sign + this.formatDecimal(magnitude, 1);
    }
    if (magnitude < 1000) {
      return sign + this.formatDecimal(magnitude, 0);
    }
    if (magnitude < 10000) {
      return sign + this.formatDecimal(magnitude / 1000, 2) + 'K';
    }
    if (magnitude < 100000) {
      return sign + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }
    if (magnitude < 1000000) {
      return sign + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }
    if (magnitude < 100000000) {
      return sign + this.formatDecimal(magnitude / 1000000, 1) + 'M';
    }
    return sign + this.formatDecimal(magnitude / 1000000, 0) + 'M';
  }

  private formatPercentage(value: number): string {
    const magnitude = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    let formatted: string;
    if (magnitude < 1) {
      formatted = this.formatDecimal(magnitude, 3);
    } else if (magnitude < 10) {
      formatted = this.formatDecimal(magnitude, 2);
    } else {
      formatted = this.formatDecimal(magnitude, 1);
    }

    return sign + formatted + '%';
  }

  private formatCurrency(value: number): string {
    const magnitude = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    const prefix = sign + '$';

    if (magnitude < 1) {
      return prefix + this.formatDecimal(magnitude, 2);
    }
    if (magnitude < 100) {
      return prefix + this.formatDecimal(magnitude, 2);
    }
    if (magnitude < 1000) {
      return prefix + this.formatDecimal(magnitude, 0);
    }
    if (magnitude < 10000) {
      return prefix + this.formatDecimal(magnitude / 1000, 2) + 'K';
    }
    if (magnitude < 100000) {
      return prefix + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }
    if (magnitude < 1000000) {
      return prefix + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }
    if (magnitude < 100000000) {
      return prefix + this.formatDecimal(magnitude / 1000000, 1) + 'M';
    }
    return prefix + this.formatDecimal(magnitude / 1000000, 0) + 'M';
  }

  private formatDecimal(value: number, decimalPlaces: number): string {
    return value.toFixed(decimalPlaces);
  }
}
