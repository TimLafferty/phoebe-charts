// =============================================================================
// MQYTD Table Template Component
// Period-to-date comparison table (MTD, QTD, YTD) with YoY comparisons
// =============================================================================

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MqytdGroup,
  MqytdRow,
  MqytdPeriodHeader,
  MqytdFooterDates,
  MqytdColumnWidths,
  DEFAULT_MQYTD_CONFIG
} from '../../../models/tables/mqytd-table-template.model';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatValue,
  getPercentageClass,
  getPercentageIcon
} from '../../../utils/format.utils';

@Component({
  selector: 'phoebe-mqytd-table-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mqytd-table-template.component.html',
  styleUrls: ['./mqytd-table-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MqytdTableTemplateComponent {
  // ---------------------------------------------------------------------------
  // Data Inputs
  // ---------------------------------------------------------------------------
  @Input() groups: MqytdGroup[] = [];
  @Input() periodHeaders: MqytdPeriodHeader[] = DEFAULT_MQYTD_CONFIG.periodHeaders!;
  @Input() footerDates: MqytdFooterDates | null = null;

  // ---------------------------------------------------------------------------
  // Configuration Inputs - NOTE: different labels than MQY
  // ---------------------------------------------------------------------------
  @Input() footerLabel: string = DEFAULT_MQYTD_CONFIG.footerLabel!;
  @Input() footerSummary: string = '';
  @Input() columnWidths: MqytdColumnWidths = DEFAULT_MQYTD_CONFIG.columnWidths!;
  @Input() deltaLabel: string = DEFAULT_MQYTD_CONFIG.deltaLabel!;
  @Input() currentLabel: string = DEFAULT_MQYTD_CONFIG.currentLabel!;
  @Input() previousLabel: string = DEFAULT_MQYTD_CONFIG.previousLabel!;
  @Input() neutralThreshold: number = DEFAULT_MQYTD_CONFIG.neutralThreshold!;

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
  trackByGroupId = (index: number, group: MqytdGroup): string => group.id;
  trackByRowId = (index: number, row: MqytdRow): string => row.id;
  trackByPeriodId = (index: number, period: MqytdPeriodHeader): string => period.id;

  // ---------------------------------------------------------------------------
  // Computed Properties
  // ---------------------------------------------------------------------------

  /** Total columns: metric + (delta + values) × 3 periods = 7 */
  get totalColumns(): number {
    return 7;
  }
}
