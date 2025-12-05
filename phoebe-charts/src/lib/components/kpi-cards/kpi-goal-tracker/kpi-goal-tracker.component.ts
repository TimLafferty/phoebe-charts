import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GoalStatus = 'on-track' | 'at-risk' | 'behind' | 'achieved';

@Component({
  selector: 'phoebe-kpi-goal-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-goal-tracker.component.html',
  styleUrls: ['./kpi-goal-tracker.component.scss'],
})
export class KpiGoalTrackerComponent {
  @Input() title: string = '';
  @Input() currentValue: number = 0;
  @Input() goalValue: number = 100;
  @Input() unit?: string;
  @Input() startDate?: string;
  @Input() endDate?: string;
  @Input() milestones?: { value: number; label: string }[];

  get percentage(): number {
    if (this.goalValue === 0) return 0;
    return Math.min(100, Math.round((this.currentValue / this.goalValue) * 100));
  }

  get remaining(): number {
    return Math.max(0, this.goalValue - this.currentValue);
  }

  get status(): GoalStatus {
    if (this.percentage >= 100) return 'achieved';
    if (this.percentage >= 75) return 'on-track';
    if (this.percentage >= 50) return 'at-risk';
    return 'behind';
  }

  get statusLabel(): string {
    switch (this.status) {
      case 'achieved': return 'Achieved';
      case 'on-track': return 'On Track';
      case 'at-risk': return 'At Risk';
      case 'behind': return 'Behind';
    }
  }

  get formattedCurrent(): string {
    return this.formatValue(this.currentValue);
  }

  get formattedGoal(): string {
    return this.formatValue(this.goalValue);
  }

  get formattedRemaining(): string {
    return this.formatValue(this.remaining);
  }

  getMilestonePosition(milestone: { value: number; label: string }): number {
    if (this.goalValue === 0) return 0;
    return Math.min(100, (milestone.value / this.goalValue) * 100);
  }

  isMilestoneReached(milestone: { value: number; label: string }): boolean {
    return this.currentValue >= milestone.value;
  }

  private formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString();
  }
}
