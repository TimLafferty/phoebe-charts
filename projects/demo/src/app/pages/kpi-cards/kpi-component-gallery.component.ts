import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  KpiBasicComparisonComponent,
  KpiBasicBanComponent,
  KpiBasicBanProps,
  BanIconGroup,
  BanIconVariant,
  BAN_ICON_GROUPS,
  KpiGoalTrackerComponent,
  StatCardComponent,
  ProgressCardComponent,
  TrendDirection,
} from '@timalexlafferty/phoebe-charts';

type IconSet = 'arrow-dots' | 'chart-line'
  | 'circle-arrow' | 'circle-caret' | 'circle-chevron'
  | 'square-arrow' | 'square-caret' | 'square-chevron';

type MetricType = 'numeric' | 'percentage' | 'currency';

type GoalTrackerDisplayMode = 'basic' | 'with-pace' | 'with-benchmark' | 'full';

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
  iconSet: IconSet;
  metricType: MetricType;
  colors: {
    positive: string;
    negative: string;
    neutral: string;
  };
}

@Component({
  selector: 'app-kpi-component-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, KpiBasicComparisonComponent, KpiBasicBanComponent, KpiGoalTrackerComponent, StatCardComponent, ProgressCardComponent],
  templateUrl: './kpi-component-gallery.component.html',
  styleUrls: ['./kpi-component-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KpiComponentGalleryComponent {
  // Global theme toggle
  selectedTheme: 'light' | 'dark' = 'light';

  // Icon set options for the selector
  iconSetOptions: IconSet[] = [
    'arrow-dots',
    'chart-line',
    'circle-arrow',
    'circle-caret',
    'circle-chevron',
    'square-arrow',
    'square-caret',
    'square-chevron',
  ];

  selectedIconSet: IconSet = 'arrow-dots';

  // BAN Icon group options for the selector
  banIconGroups = BAN_ICON_GROUPS;
  banIconGroupOptions: BanIconGroup[] = Object.keys(BAN_ICON_GROUPS) as BanIconGroup[];
  selectedBanIconGroup: BanIconGroup = 'users';

  get banIconVariantOptions(): BanIconVariant[] {
    const group = this.banIconGroups[this.selectedBanIconGroup];
    return Object.keys(group) as BanIconVariant[];
  }

  selectedBanIconVariant: BanIconVariant = 'users';

  // Goal Tracker display mode options
  goalTrackerDisplayModes: { value: GoalTrackerDisplayMode; label: string }[] = [
    { value: 'basic', label: 'Basic (Current vs Goal)' },
    { value: 'with-pace', label: 'With Pace' },
    { value: 'with-benchmark', label: 'With Benchmark' },
    { value: 'full', label: 'Full (Pace + Benchmark)' },
  ];
  selectedGoalTrackerMode: GoalTrackerDisplayMode = 'full';

  get showPace(): boolean {
    return this.selectedGoalTrackerMode === 'with-pace' || this.selectedGoalTrackerMode === 'full';
  }

  get showBenchmark(): boolean {
    return this.selectedGoalTrackerMode === 'with-benchmark' || this.selectedGoalTrackerMode === 'full';
  }

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
      negativeIsBetter: false,
      description: 'Total revenue for the current month',
      iconSet: 'arrow-dots',
      metricType: 'currency',
      colors: { positive: '#22c55e', negative: '#ef4444', neutral: '#6b7280' }
    },
    {
      metric: 'OPS+',
      timeframe: 'Season',
      currentPeriodValue: .893,
      currentPeriodDisplay: '2025',
      previousPeriodValue: .987,
      previousPeriodDisplay: '2024',
      negativeIsBetter: false,
      description: 'OPS+ for the current season',
      iconSet: 'arrow-dots',
      metricType: 'numeric',
      colors: { positive: '#22c55e', negative: '#ef4444', neutral: '#6b7280' }
    },
    {
      metric: 'Conversion Rate',
      timeframe: 'Week-to-Date',
      currentPeriodValue: 4.75,
      currentPeriodDisplay: 'This Week',
      previousPeriodValue: 3.92,
      previousPeriodDisplay: 'Week',
      negativeIsBetter: false,
      description: 'Website conversion rate',
      iconSet: 'arrow-dots',
      metricType: 'percentage',
      colors: { positive: '#22c55e', negative: '#ef4444', neutral: '#6b7280' }
    },
  ];

  getCardWithIconSet(card: KpiBasicComparisonProps): KpiBasicComparisonProps {
    return { ...card, iconSet: this.selectedIconSet };
  }

  // Demo data for KpiBasicBan - each card has its own icon group/variant
  kpiBasicBanCards: KpiBasicBanProps[] = [
    {
      metric: 'Total Users',
      value: 24521,
      label: 'Active accounts this month',
      timeframe: 'Month-to-Date',
      metricType: 'numeric',
      iconGroup: 'users',
      iconVariant: 'users',
      colors: { background: '#ffffff', text: '#1e293b', accent: '#3b82f6' }
    },
    {
      metric: 'Revenue',
      value: 1250000,
      label: 'Gross revenue YTD',
      timeframe: 'Year-to-Date',
      metricType: 'currency',
      iconGroup: 'financial',
      iconVariant: 'sack-dollar',
      colors: { background: '#ffffff', text: '#1e293b', accent: '#22c55e' }
    },
    {
      metric: 'Conversion',
      value: 4.75,
      label: 'Website visitor conversion',
      timeframe: 'This Week',
      metricType: 'percentage',
      iconGroup: 'analytics',
      iconVariant: 'chart-line',
      colors: { background: '#ffffff', text: '#1e293b', accent: '#8b5cf6' }
    },
  ];

  onIconGroupChange(): void {
    // Reset variant to first option when group changes
    this.selectedBanIconVariant = this.banIconVariantOptions[0];
  }

  getBanCardWithIcon(card: KpiBasicBanProps): KpiBasicBanProps {
    return { ...card, iconGroup: this.selectedBanIconGroup, iconVariant: this.selectedBanIconVariant };
  }

  // Demo data for KpiGoalTracker
  kpiGoalTrackerCards = [
    {
      title: 'Q4 Sales Target',
      currentValue: 875000,
      goalValue: 1000000,
      paceValue: 1050000,
      paceLabel: 'Pace',
      benchmarkValue: 920000,
      benchmarkLabel: 'Q3 Actual',
      unit: 'USD',
      startDate: 'Oct 1, 2025',
      endDate: 'Dec 31, 2025',
    },
    {
      title: 'New User Signups',
      currentValue: 4250,
      goalValue: 10000,
      paceValue: 8500,
      paceLabel: 'Pace',
      benchmarkValue: 9200,
      benchmarkLabel: 'Last Year',
      unit: 'users',
      startDate: 'Jan 1, 2025',
      endDate: 'Dec 31, 2025',
    },
    {
      title: 'Support Tickets Closed',
      currentValue: 740,
      goalValue: 1000,
      paceValue: 820,
      paceLabel: 'Pace',
      benchmarkValue: 960,
      benchmarkLabel: 'Previous Cycle',
      unit: 'tickets',
      startDate: 'Apr 1, 2025',
      endDate: 'Jun 30, 2025',
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
