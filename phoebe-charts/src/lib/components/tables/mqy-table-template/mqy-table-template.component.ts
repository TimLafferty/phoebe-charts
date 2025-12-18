// =============================================================================
// MQY Table Template Component
// Period-over-period comparison table (MoM, QoQ, YoY)
// =============================================================================

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MqyGroup,
  MqyRow,
  MqyPeriodHeader,
  MqyFooterDates,
  MqyColumnWidths,
  DEFAULT_MQY_CONFIG
} from '../../../models/tables/mqy-table-template.model';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatValue,
  getPercentageClass,
  getPercentageIcon
} from '../../../utils/format.utils';

@Component({
  selector: 'phoebe-mqy-table-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mqy-table-template.component.html',
  styleUrls: ['./mqy-table-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MqyTableTemplateComponent {
  // ---------------------------------------------------------------------------
  // Data Inputs
  // ---------------------------------------------------------------------------
  @Input() groups: MqyGroup[] = [];
  @Input() periodHeaders: MqyPeriodHeader[] = DEFAULT_MQY_CONFIG.periodHeaders!;
  @Input() footerDates: MqyFooterDates | null = null;

  // ---------------------------------------------------------------------------
  // Configuration Inputs
  // ---------------------------------------------------------------------------
  @Input() footerLabel: string = DEFAULT_MQY_CONFIG.footerLabel!;
  @Input() footerSummary: string = '';
  @Input() columnWidths: MqyColumnWidths = DEFAULT_MQY_CONFIG.columnWidths!;
  @Input() rowLabel: string = DEFAULT_MQY_CONFIG.rowLabel!;
  @Input() currentLabel: string = DEFAULT_MQY_CONFIG.currentLabel!;
  @Input() neutralThreshold: number = DEFAULT_MQY_CONFIG.neutralThreshold!;
  @Input() showContextRank: boolean = false;

  // ---------------------------------------------------------------------------
  // Formatting Methods (delegate to utilities)
  // ---------------------------------------------------------------------------
  formatCurrency = (value: number): string => formatCurrency(value);
  formatNumber = (value: number): string => formatNumber(value);
  formatPercentage = (percentage: number | null): string => formatPercentage(percentage);
  formatValue = (value: number, isMonetary: boolean = false): string =>
    formatValue(value, isMonetary);

  getPercentageClass = (percentage: number | null): string =>
    getPercentageClass(percentage, this.neutralThreshold);
  getPercentageIcon = (percentage: number | null): string =>
    getPercentageIcon(percentage, this.neutralThreshold);

  // ---------------------------------------------------------------------------
  // TrackBy Functions for ngFor optimization
  // ---------------------------------------------------------------------------
  trackByGroupId = (index: number, group: MqyGroup): string => group.id;
  trackByRowId = (index: number, row: MqyRow): string => row.id;
  trackByPeriodId = (index: number, period: MqyPeriodHeader): string => period.id;

  // ---------------------------------------------------------------------------
  // Computed Properties
  // ---------------------------------------------------------------------------
  get totalColumns(): number {
    // Metric + Current + 3 period columns + optional rank column
    return this.showContextRank ? 6 : 5;
  }

  /**
   * Get the previous period start date for a given period header
   */
  getPreviousStartDate(periodId: 'mom' | 'qoq' | 'yoy'): string | null {
    return this.footerDates?.[periodId]?.previous?.start ?? null;
  }
}
