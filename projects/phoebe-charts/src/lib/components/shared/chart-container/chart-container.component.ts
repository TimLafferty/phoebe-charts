import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartContext } from '../../../models/chart-utilities/chart-context.model';

@Component({
  selector: 'phoebe-chart-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
})
export class ChartContainerComponent {
  @Input() chartTitle?: string;
  @Input() chartSubtitle?: string;
  @Input() chartFooter?: string;
  @Input() context?: ChartContext;

  get title(): string | undefined {
    return this.chartTitle || this.context?.chartTitle;
  }

  get subtitle(): string | undefined {
    return this.chartSubtitle || this.context?.chartSubtitle;
  }

  get footer(): string | undefined {
    return this.chartFooter || this.context?.chartFooter;
  }
}

