import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MqyTableTemplateComponent,
  MqyTableTemplateService,
  MqyGroup,
  MqyFooterDates,
  MqyGroupInput
} from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-mqy-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MqyTableTemplateComponent],
  templateUrl: './mqy-table.component.html',
  styleUrls: ['./mqy-table.component.scss']
})
export class MqyTableComponent {
  private mqyService = inject(MqyTableTemplateService);

  // Configuration options
  showContextRank = false;
  neutralThreshold = 2;
  rowLabel = 'Metric';
  currentLabel = 'Current';
  footerLabel = 'Period Comparisons';

  // Data
  benchmarkGroups: MqyGroup[] = [];
  footerDates: MqyFooterDates | null = null;
  anchorMonth = '2024-11-01';

  constructor() {
    this.loadSampleData();
  }

  loadSampleData(): void {
    const sampleData: MqyGroupInput[] = [
      {
        id: 'revenue-metrics',
        label: 'Revenue Metrics',
        icon: 'fa-solid fa-dollar-sign',
        rows: [
          {
            id: 'total-revenue',
            label: 'Total Revenue',
            rank: 1,
            current: 1250000,
            momPrevious: 1180000,
            momPercentage: 5.9,
            qoqPrevious: 1050000,
            qoqPercentage: 19.0,
            yoyPrevious: 980000,
            yoyPercentage: 27.6,
            isMonetary: true
          },
          {
            id: 'recurring-revenue',
            label: 'Recurring Revenue',
            rank: 2,
            current: 890000,
            momPrevious: 875000,
            momPercentage: 1.7,
            qoqPrevious: 820000,
            qoqPercentage: 8.5,
            yoyPrevious: 720000,
            yoyPercentage: 23.6,
            isMonetary: true
          },
          {
            id: 'avg-deal-size',
            label: 'Avg Deal Size',
            rank: 3,
            current: 45000,
            momPrevious: 42000,
            momPercentage: 7.1,
            qoqPrevious: 38000,
            qoqPercentage: 18.4,
            yoyPrevious: 35000,
            yoyPercentage: 28.6,
            isMonetary: true
          }
        ]
      },
      {
        id: 'customer-metrics',
        label: 'Customer Metrics',
        icon: 'fa-solid fa-users',
        rows: [
          {
            id: 'total-customers',
            label: 'Total Customers',
            rank: 1,
            current: 2450,
            momPrevious: 2380,
            momPercentage: 2.9,
            qoqPrevious: 2150,
            qoqPercentage: 14.0,
            yoyPrevious: 1850,
            yoyPercentage: 32.4,
            isMonetary: false
          },
          {
            id: 'new-customers',
            label: 'New Customers',
            rank: 2,
            current: 125,
            momPrevious: 118,
            momPercentage: 5.9,
            qoqPrevious: 95,
            qoqPercentage: 31.6,
            yoyPrevious: 78,
            yoyPercentage: 60.3,
            isMonetary: false
          },
          {
            id: 'churn-rate',
            label: 'Churn Rate',
            rank: 3,
            current: 2.1,
            momPrevious: 2.3,
            momPercentage: -8.7,
            qoqPrevious: 2.8,
            qoqPercentage: -25.0,
            yoyPrevious: 3.5,
            yoyPercentage: -40.0,
            isMonetary: false
          }
        ]
      },
      {
        id: 'engagement-metrics',
        label: 'Engagement Metrics',
        icon: 'fa-solid fa-chart-line',
        rows: [
          {
            id: 'active-users',
            label: 'Active Users',
            rank: 1,
            current: 18500,
            momPrevious: 17800,
            momPercentage: 3.9,
            qoqPrevious: 15200,
            qoqPercentage: 21.7,
            yoyPrevious: 12000,
            yoyPercentage: 54.2,
            isMonetary: false
          },
          {
            id: 'session-duration',
            label: 'Avg Session (min)',
            rank: 2,
            current: 12.5,
            momPrevious: 11.8,
            momPercentage: 5.9,
            qoqPrevious: 10.2,
            qoqPercentage: 22.5,
            yoyPrevious: 8.5,
            yoyPercentage: 47.1,
            isMonetary: false
          },
          {
            id: 'nps-score',
            label: 'NPS Score',
            rank: 3,
            current: 72,
            momPrevious: 70,
            momPercentage: 2.9,
            qoqPrevious: 68,
            qoqPercentage: 5.9,
            yoyPrevious: 62,
            yoyPercentage: 16.1,
            isMonetary: false
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqyService.createGroups(sampleData);
    this.generateFooterDates();
  }

  loadMinimalData(): void {
    const minimalData: MqyGroupInput[] = [
      {
        id: 'basic-metrics',
        label: '',
        rows: [
          {
            id: 'revenue',
            label: 'Revenue',
            current: 500000,
            momPrevious: 480000,
            momPercentage: 4.2,
            qoqPrevious: 420000,
            qoqPercentage: 19.0,
            yoyPrevious: 380000,
            yoyPercentage: 31.6,
            isMonetary: true
          },
          {
            id: 'users',
            label: 'Users',
            current: 5000,
            momPrevious: 4800,
            momPercentage: 4.2,
            qoqPrevious: 4200,
            qoqPercentage: 19.0,
            yoyPrevious: 3500,
            yoyPercentage: 42.9,
            isMonetary: false
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqyService.createGroups(minimalData);
    this.generateFooterDates();
  }

  loadNeutralData(): void {
    const neutralData: MqyGroupInput[] = [
      {
        id: 'stable-metrics',
        label: 'Stable Metrics',
        icon: 'fa-solid fa-equals',
        rows: [
          {
            id: 'metric-1',
            label: 'Stable Metric A',
            current: 100,
            momPrevious: 99,
            momPercentage: 1.0,
            qoqPrevious: 98,
            qoqPercentage: 0.5,
            yoyPrevious: 101,
            yoyPercentage: -1.0,
            isMonetary: false
          },
          {
            id: 'metric-2',
            label: 'Stable Metric B',
            current: 1000,
            momPrevious: 1005,
            momPercentage: -0.5,
            qoqPrevious: 995,
            qoqPercentage: 0.5,
            yoyPrevious: 1010,
            yoyPercentage: -1.0,
            isMonetary: true
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqyService.createGroups(neutralData);
    this.generateFooterDates();
  }

  private generateFooterDates(): void {
    this.footerDates = this.mqyService.createFooterDates(
      this.mqyService.getCurrentMonthRange(this.anchorMonth),
      this.mqyService.getPreviousMonthRange(this.anchorMonth),
      this.mqyService.getCurrentQuarterRange(this.anchorMonth),
      this.mqyService.getPreviousQuarterRange(this.anchorMonth),
      this.mqyService.getCurrentMonthRange(this.anchorMonth),
      this.mqyService.getSameMonthLastYearRange(this.anchorMonth)
    );
  }

  toggleRank(): void {
    this.showContextRank = !this.showContextRank;
  }

  get totalGroups(): number {
    return this.benchmarkGroups.length;
  }

  get totalRows(): number {
    return this.benchmarkGroups.reduce((sum, group) => sum + group.rows.length, 0);
  }
}
