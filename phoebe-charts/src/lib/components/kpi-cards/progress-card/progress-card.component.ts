import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'phoebe-progress-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss'],
})
export class ProgressCardComponent {
  @Input() label: string = '';
  @Input() current: number = 0;
  @Input() target: number = 100;
  @Input() unit?: string;
  @Input() showPercentage: boolean = true;
  @Input() theme: 'light' | 'dark' = 'light';

  get percentage(): number {
    if (this.target === 0) return 0;
    return Math.min(100, Math.round((this.current / this.target) * 100));
  }

  get displayValue(): string {
    if (this.unit) {
      return `${this.current} / ${this.target} ${this.unit}`;
    }
    return `${this.current} / ${this.target}`;
  }
}
