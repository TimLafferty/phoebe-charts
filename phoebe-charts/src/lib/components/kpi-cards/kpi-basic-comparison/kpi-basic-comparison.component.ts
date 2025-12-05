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
