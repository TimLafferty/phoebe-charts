import { Pipe, PipeTransform } from '@angular/core';

/**
 * KPI BAN Percent Pipe
 * Formats percentage values with dynamic decimal places based on magnitude.
 *
 * Formatting rules (based on absolute percentage value):
 * - |value| < 1: 3 decimal places (e.g., 0.123%)
 * - |value| < 10: 2 decimal places (e.g., 5.67%)
 * - |value| >= 10: 1 decimal place (e.g., 45.6%)
 */
@Pipe({
  name: 'KpiBanPercent',
  standalone: true,
})
export class KpiBanPercentPipe implements PipeTransform {
  transform(value: number | null | undefined, includeSymbol: boolean = true): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    }

    const magnitude = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    const suffix = includeSymbol ? '%' : '';

    let formatted: string;

    if (magnitude < 1) {
      // 3 decimal places
      formatted = magnitude.toFixed(3);
    } else if (magnitude < 10) {
      // 2 decimal places
      formatted = magnitude.toFixed(2);
    } else {
      // 1 decimal place
      formatted = magnitude.toFixed(1);
    }

    return sign + formatted + suffix;
  }
}
