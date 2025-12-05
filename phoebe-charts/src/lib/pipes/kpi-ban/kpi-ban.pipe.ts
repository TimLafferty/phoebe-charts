import { Pipe, PipeTransform } from '@angular/core';

/**
 * KPI BAN (Big Ass Number) Pipe
 * Formats numbers based on magnitude with appropriate abbreviations.
 *
 * Formatting rules (based on absolute magnitude):
 * - |value| < 1: max 3 decimal places (e.g., 0.123)
 * - |value| < 100: 1 decimal place (e.g., 45.6)
 * - |value| < 1,000: 0 decimal places (e.g., 456)
 * - |value| < 10,000: divide by 1000, 2 decimal places (e.g., 4.56K)
 * - |value| < 100,000: divide by 1000, 1 decimal place (e.g., 45.6K)
 * - |value| < 1,000,000: divide by 1000, 0 decimal places (e.g., 456K)
 * - |value| < 100,000,000: divide by 1000000, 1 decimal place (e.g., 45.6M)
 * - |value| >= 100,000,000: divide by 1000000, 0 decimal places (e.g., 456M)
 */
@Pipe({
  name: 'KpiBan',
  standalone: true,
})
export class KpiBanPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    const magnitude = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (magnitude < 1) {
      // Max 3 decimal places, preserve leading zeros
      return sign + this.formatDecimal(magnitude, 3);
    }

    if (magnitude < 100) {
      // 1 decimal place
      return sign + this.formatDecimal(magnitude, 1);
    }

    if (magnitude < 1000) {
      // 0 decimal places
      return sign + this.formatDecimal(magnitude, 0);
    }

    if (magnitude < 10000) {
      // Divide by 1000, 2 decimal places + K
      return sign + this.formatDecimal(magnitude / 1000, 2) + 'K';
    }

    if (magnitude < 100000) {
      // Divide by 1000, 1 decimal place + K
      return sign + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }

    if (magnitude < 1000000) {
      // Divide by 1000, 0 decimal places + K
      return sign + this.formatDecimal(magnitude / 1000, 1) + 'K';
    }

    if (magnitude < 100000000) {
      // Divide by 1000000, 1 decimal place + M
      return sign + this.formatDecimal(magnitude / 1000000, 1) + 'M';
    }

    // >= 100,000,000: Divide by 1000000, 0 decimal places + M
    return sign + this.formatDecimal(magnitude / 1000000, 0) + 'M';
  }

  private formatDecimal(value: number, decimalPlaces: number): string {
    return value.toFixed(decimalPlaces);
  }
}
