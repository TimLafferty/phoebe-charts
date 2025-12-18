import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MqytdTableTemplateComponent,
  MqytdTableTemplateService,
  MqytdGroup,
  MqytdFooterDates,
  MqytdGroupInput
} from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-mqytd-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MqytdTableTemplateComponent],
  templateUrl: './mqytd-table.component.html',
  styleUrls: ['./mqytd-table.component.scss']
})
export class MqytdTableComponent {
  private mqytdService = inject(MqytdTableTemplateService);

  // Configuration options
  neutralThreshold = 2;
  deltaLabel = 'Delta %';
  currentLabel = 'Current';
  previousLabel = 'Previous';
  comparisonType: 'comparative' | 'fiscal' = 'fiscal';

  // Data
  benchmarkGroups: MqytdGroup[] = [];
  footerDates: MqytdFooterDates | null = null;
  anchorDate = '2024-12-15';
  fiscalStartMonth = 1; // January

  constructor() {
    this.loadSampleData();
  }

  loadSampleData(): void {
    const sampleData: MqytdGroupInput[] = [
      {
        id: 'revenue-metrics',
        label: 'Revenue Metrics',
        icon: 'fa-solid fa-dollar-sign',
        rows: [
          {
            id: 'sold-dollars',
            label: 'Sold Dollars',
            mtd: 1250000,
            mtdPrevious: 1180000,
            mtdPercentage: 5.9,
            qtd: 3650000,
            qtdPrevious: 3420000,
            qtdPercentage: 6.7,
            ytd: 14200000,
            ytdPrevious: 12800000,
            ytdPercentage: 10.9,
            isMonetary: true
          },
          {
            id: 'buyer-premium',
            label: 'Buyer Premium',
            mtd: 187500,
            mtdPrevious: 177000,
            mtdPercentage: 5.9,
            qtd: 547500,
            qtdPrevious: 513000,
            qtdPercentage: 6.7,
            ytd: 2130000,
            ytdPrevious: 1920000,
            ytdPercentage: 10.9,
            isMonetary: true
          },
          {
            id: 'seller-commission',
            label: 'Seller Commission',
            mtd: 125000,
            mtdPrevious: 118000,
            mtdPercentage: 5.9,
            qtd: 365000,
            qtdPrevious: 342000,
            qtdPercentage: 6.7,
            ytd: 1420000,
            ytdPrevious: 1280000,
            ytdPercentage: 10.9,
            isMonetary: true
          }
        ]
      },
      {
        id: 'volume-metrics',
        label: 'Volume Metrics',
        icon: 'fa-solid fa-boxes-stacked',
        rows: [
          {
            id: 'lots-sold',
            label: 'Lots Sold',
            mtd: 2450,
            mtdPrevious: 2380,
            mtdPercentage: 2.9,
            qtd: 7150,
            qtdPrevious: 6820,
            qtdPercentage: 4.8,
            ytd: 28500,
            ytdPrevious: 26200,
            ytdPercentage: 8.8,
            isMonetary: false
          },
          {
            id: 'lots-offered',
            label: 'Lots Offered',
            mtd: 3200,
            mtdPrevious: 3100,
            mtdPercentage: 3.2,
            qtd: 9400,
            qtdPrevious: 8900,
            qtdPercentage: 5.6,
            ytd: 37200,
            ytdPrevious: 34500,
            ytdPercentage: 7.8,
            isMonetary: false
          },
          {
            id: 'sell-through',
            label: 'Sell-Through Rate',
            mtd: 76.6,
            mtdPrevious: 76.8,
            mtdPercentage: -0.3,
            qtd: 76.1,
            qtdPrevious: 76.6,
            qtdPercentage: -0.7,
            ytd: 76.6,
            ytdPrevious: 75.9,
            ytdPercentage: 0.9,
            isMonetary: false
          }
        ]
      },
      {
        id: 'bidder-metrics',
        label: 'Bidder Metrics',
        icon: 'fa-solid fa-users',
        rows: [
          {
            id: 'unique-bidders',
            label: 'Unique Bidders',
            mtd: 4250,
            mtdPrevious: 3980,
            mtdPercentage: 6.8,
            qtd: 12400,
            qtdPrevious: 11200,
            qtdPercentage: 10.7,
            ytd: 48500,
            ytdPrevious: 42000,
            ytdPercentage: 15.5,
            isMonetary: false
          },
          {
            id: 'new-bidders',
            label: 'New Bidders',
            mtd: 580,
            mtdPrevious: 520,
            mtdPercentage: 11.5,
            qtd: 1650,
            qtdPrevious: 1420,
            qtdPercentage: 16.2,
            ytd: 6200,
            ytdPrevious: 5100,
            ytdPercentage: 21.6,
            isMonetary: false
          },
          {
            id: 'avg-bid-amount',
            label: 'Avg Bid Amount',
            mtd: 510,
            mtdPrevious: 496,
            mtdPercentage: 2.8,
            qtd: 510,
            qtdPrevious: 502,
            qtdPercentage: 1.6,
            ytd: 498,
            ytdPrevious: 488,
            ytdPercentage: 2.0,
            isMonetary: true
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqytdService.createGroups(sampleData);
    this.generateFooterDates();
  }

  loadMinimalData(): void {
    const minimalData: MqytdGroupInput[] = [
      {
        id: 'basic-metrics',
        label: '',
        rows: [
          {
            id: 'revenue',
            label: 'Revenue',
            mtd: 500000,
            mtdPrevious: 480000,
            mtdPercentage: 4.2,
            qtd: 1450000,
            qtdPrevious: 1380000,
            qtdPercentage: 5.1,
            ytd: 5800000,
            ytdPrevious: 5200000,
            ytdPercentage: 11.5,
            isMonetary: true
          },
          {
            id: 'units',
            label: 'Units Sold',
            mtd: 1200,
            mtdPrevious: 1150,
            mtdPercentage: 4.3,
            qtd: 3500,
            qtdPrevious: 3300,
            qtdPercentage: 6.1,
            ytd: 14000,
            ytdPrevious: 12500,
            ytdPercentage: 12.0,
            isMonetary: false
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqytdService.createGroups(minimalData);
    this.generateFooterDates();
  }

  loadDeclineData(): void {
    const declineData: MqytdGroupInput[] = [
      {
        id: 'declining-metrics',
        label: 'Declining Metrics',
        icon: 'fa-solid fa-arrow-trend-down',
        rows: [
          {
            id: 'metric-1',
            label: 'Legacy Product Sales',
            mtd: 85000,
            mtdPrevious: 120000,
            mtdPercentage: -29.2,
            qtd: 240000,
            qtdPrevious: 380000,
            qtdPercentage: -36.8,
            ytd: 920000,
            ytdPrevious: 1450000,
            ytdPercentage: -36.6,
            isMonetary: true
          },
          {
            id: 'metric-2',
            label: 'Store Visits',
            mtd: 4200,
            mtdPrevious: 5800,
            mtdPercentage: -27.6,
            qtd: 12500,
            qtdPrevious: 18200,
            qtdPercentage: -31.3,
            ytd: 48000,
            ytdPrevious: 72000,
            ytdPercentage: -33.3,
            isMonetary: false
          }
        ]
      }
    ];

    this.benchmarkGroups = this.mqytdService.createGroups(declineData);
    this.generateFooterDates();
  }

  generateFooterDates(): void {
    this.footerDates = this.mqytdService.createFooterDates(
      this.mqytdService.getCurrentMTDRange(this.anchorDate),
      this.mqytdService.getPreviousMTDRange(this.anchorDate, this.comparisonType),
      this.mqytdService.getCurrentQTDRange(this.anchorDate, this.fiscalStartMonth),
      this.mqytdService.getPreviousQTDRange(this.anchorDate, this.comparisonType, this.fiscalStartMonth),
      this.mqytdService.getCurrentYTDRange(this.anchorDate, this.fiscalStartMonth),
      this.mqytdService.getPreviousYTDRange(this.anchorDate, this.comparisonType, this.fiscalStartMonth)
    );
  }

  toggleComparisonType(): void {
    this.comparisonType = this.comparisonType === 'fiscal' ? 'comparative' : 'fiscal';
    this.generateFooterDates();
  }

  get totalGroups(): number {
    return this.benchmarkGroups.length;
  }

  get totalRows(): number {
    return this.benchmarkGroups.reduce((sum, group) => sum + group.rows.length, 0);
  }
}
