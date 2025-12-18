import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { KpiBanPipe } from '../../../pipes/kpi-ban/kpi-ban.pipe';

interface KpiBasicComparisonProps {
  metric: string;
  timeframe: string;
  currentPeriodValue: number;
  currentPeriodDisplay: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  previousPeriodValue: number;
  previousPeriodDisplay: string;
  previousPeriodStart?: string;
  previousPeriodEnd?: string;
  negativeIsBetter: boolean;
  description: string | null;
  metricType: 'numeric' | 'percentage' | 'currency';
  iconSet: 'arrow-dots' | 'chart-line'
  | 'circle-arrow' | 'circle-caret' | 'circle-chevron'
  | 'square-arrow' | 'square-caret' | 'square-chevron';
  colors: {
    positive: string;
    negative: string;
    neutral: string;
  }
}

@Component({
  selector: 'phoebe-kpi-basic-comparison',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, KpiBanPipe],
  templateUrl: './kpi-basic-comparison.component.html',
  styleUrls: ['./kpi-basic-comparison.component.scss'],
})
export class KpiBasicComparisonComponent {
  @Input() props!: KpiBasicComparisonProps;
  @Input() theme: 'light' | 'dark' = 'light';

  private readonly iconMap: Record<string, { up: string; down: string; useRotation?: boolean }> = {
    'arrow-dots': { up: 'fa-arrow-up-right-dots', down: 'fa-arrow-up-right-dots', useRotation: true },
    'chart-line': { up: 'fa-chart-line-up', down: 'fa-chart-line-down' },
    'circle-arrow': { up: 'fa-circle-arrow-up', down: 'fa-circle-arrow-down' },
    'circle-caret': { up: 'fa-circle-caret-up', down: 'fa-circle-caret-down' },
    'circle-chevron': { up: 'fa-circle-chevron-up', down: 'fa-circle-chevron-down' },
    'square-arrow': { up: 'fa-square-arrow-up', down: 'fa-square-arrow-down' },
    'square-caret': { up: 'fa-square-caret-up', down: 'fa-square-caret-down' },
    'square-chevron': { up: 'fa-square-chevron-up', down: 'fa-square-chevron-down' },
  };

  get iconClass(): string {
    const iconSet = this.props.iconSet || 'arrow-dots';
    const icons = this.iconMap[iconSet] || this.iconMap['arrow-dots'];
    return this.isPositiveChange ? icons.up : icons.down;
  }

  get useRotation(): boolean {
    const iconSet = this.props.iconSet || 'arrow-dots';
    const icons = this.iconMap[iconSet] || this.iconMap['arrow-dots'];
    return icons.useRotation === true;
  }

  get percentageChange(): number {
    const { currentPeriodValue, previousPeriodValue } = this.props;
    const denominator = previousPeriodValue === 0 ? 1 : previousPeriodValue;
    return ((currentPeriodValue - previousPeriodValue) / denominator) * 100;
  }

  get hasChange(): boolean {
    return this.props.currentPeriodValue !== this.props.previousPeriodValue;
  }

  get isPositiveChange(): boolean {
    return this.percentageChange >= 0;
  }

  get isFavorableChange(): boolean {
    return this.props.negativeIsBetter ? !this.isPositiveChange : this.isPositiveChange;
  }
}
