import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  KpiBasicComparisonComponent,
  StatCardComponent,
  ProgressCardComponent,
  TrendDirection,
} from '@timalexlafferty/phoebe-charts';

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
  selector: 'app-kpi-component-gallery',
  standalone: true,
  imports: [CommonModule, KpiBasicComparisonComponent, StatCardComponent, ProgressCardComponent],
  templateUrl: './kpi-component-gallery.component.html',
  styleUrls: ['./kpi-component-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KpiComponentGalleryComponent {
  // Demo data for KpiBasicComparison
  kpiBasicComparisonCards: KpiBasicComparisonProps[] = [
    {
      metric: 'Total Revenue',
      timeframe: 'Month-to-Date',
      currentPeriodValue: 124500,
      currentPeriodDisplay: 'Nov. 2025',
      currentPeriodStart: '11.01',
      currentPeriodEnd: '11.30',
      previousPeriodValue: 110000,
      previousPeriodDisplay: 'Month',
      previousPeriodStart: '10.01',
      previousPeriodEnd: '10.30',
      negativeIsBetter: false, description: 'Total revenue for the current month'
    },
    {
      metric: 'OPS+',
      timeframe: 'Season',
      currentPeriodValue: .893,
      currentPeriodDisplay: '2025',
      previousPeriodValue: .987,
      previousPeriodDisplay: '2024',
      negativeIsBetter: false,
      description: 'OPS+ for the current season'
    },
  ];

  // // Demo data for StatCard
  // statCards: { label: string; value: string; change: string; trend: TrendDirection }[] = [
  //   { label: 'Sales', value: '$45,231', change: '+12.5%', trend: 'up' },
  //   { label: 'Orders', value: '1,205', change: '-3.2%', trend: 'down' },
  //   { label: 'Visitors', value: '24,521', change: '0%', trend: 'neutral' },
  // ];

  // // Demo data for ProgressCard
  // progressCards = [
  //   { label: 'Monthly Goal', current: 75000, target: 100000, unit: 'USD' },
  //   { label: 'Tasks Completed', current: 18, target: 25 },
  //   { label: 'Storage Used', current: 7.2, target: 10, unit: 'GB' },
  // ];
}
