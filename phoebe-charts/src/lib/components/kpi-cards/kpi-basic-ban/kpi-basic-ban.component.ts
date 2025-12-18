import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiBanPipe, MetricType } from '../../../pipes/kpi-ban/kpi-ban.pipe';

/** Icon group categories for BAN cards */
export type BanIconGroup =
  | 'financial'
  | 'users'
  | 'performance'
  | 'engagement'
  | 'commerce'
  | 'time'
  | 'analytics'
  | 'status';

/** Icon variants available within each group */
export type BanIconVariant =
  // Financial
  | 'dollar' | 'coins' | 'wallet' | 'credit-card' | 'piggy-bank' | 'sack-dollar'
  // Users
  | 'users' | 'user' | 'user-group' | 'people-group' | 'user-plus'
  // Performance
  | 'gauge' | 'rocket' | 'bolt' | 'arrow-trend-up' | 'medal'
  // Engagement
  | 'heart' | 'thumbs-up' | 'comments' | 'share' | 'star'
  // Commerce
  | 'cart' | 'bag' | 'box' | 'truck' | 'store'
  // Time
  | 'clock' | 'calendar' | 'hourglass' | 'stopwatch'
  // Analytics
  | 'chart-line' | 'chart-bar' | 'chart-pie' | 'magnifying-glass-chart'
  // Status
  | 'check-circle' | 'circle-exclamation' | 'circle-info' | 'shield';

/** Structure for icon definitions */
export interface BanIconDefinition {
  icon: string;
  label: string;
}

/** All available icon groups with their variants */
export const BAN_ICON_GROUPS: Record<BanIconGroup, Record<string, BanIconDefinition>> = {
  financial: {
    'dollar': { icon: 'fa-solid fa-dollar-sign', label: 'Dollar' },
    'coins': { icon: 'fa-solid fa-coins', label: 'Coins' },
    'wallet': { icon: 'fa-solid fa-wallet', label: 'Wallet' },
    'credit-card': { icon: 'fa-solid fa-credit-card', label: 'Credit Card' },
    'piggy-bank': { icon: 'fa-solid fa-piggy-bank', label: 'Piggy Bank' },
    'sack-dollar': { icon: 'fa-solid fa-sack-dollar', label: 'Money Bag' },
  },
  users: {
    'users': { icon: 'fa-solid fa-users', label: 'Users' },
    'user': { icon: 'fa-solid fa-user', label: 'User' },
    'user-group': { icon: 'fa-solid fa-user-group', label: 'User Group' },
    'people-group': { icon: 'fa-solid fa-people-group', label: 'People Group' },
    'user-plus': { icon: 'fa-solid fa-user-plus', label: 'User Plus' },
  },
  performance: {
    'gauge': { icon: 'fa-solid fa-gauge-high', label: 'Gauge' },
    'rocket': { icon: 'fa-solid fa-rocket', label: 'Rocket' },
    'bolt': { icon: 'fa-solid fa-bolt', label: 'Bolt' },
    'arrow-trend-up': { icon: 'fa-solid fa-arrow-trend-up', label: 'Trend Up' },
    'medal': { icon: 'fa-solid fa-medal', label: 'Medal' },
  },
  engagement: {
    'heart': { icon: 'fa-solid fa-heart', label: 'Heart' },
    'thumbs-up': { icon: 'fa-solid fa-thumbs-up', label: 'Thumbs Up' },
    'comments': { icon: 'fa-solid fa-comments', label: 'Comments' },
    'share': { icon: 'fa-solid fa-share-nodes', label: 'Share' },
    'star': { icon: 'fa-solid fa-star', label: 'Star' },
  },
  commerce: {
    'cart': { icon: 'fa-solid fa-cart-shopping', label: 'Cart' },
    'bag': { icon: 'fa-solid fa-bag-shopping', label: 'Bag' },
    'box': { icon: 'fa-solid fa-box', label: 'Box' },
    'truck': { icon: 'fa-solid fa-truck', label: 'Truck' },
    'store': { icon: 'fa-solid fa-store', label: 'Store' },
  },
  time: {
    'clock': { icon: 'fa-solid fa-clock', label: 'Clock' },
    'calendar': { icon: 'fa-solid fa-calendar', label: 'Calendar' },
    'hourglass': { icon: 'fa-solid fa-hourglass-half', label: 'Hourglass' },
    'stopwatch': { icon: 'fa-solid fa-stopwatch', label: 'Stopwatch' },
  },
  analytics: {
    'chart-line': { icon: 'fa-solid fa-chart-line', label: 'Line Chart' },
    'chart-bar': { icon: 'fa-solid fa-chart-bar', label: 'Bar Chart' },
    'chart-pie': { icon: 'fa-solid fa-chart-pie', label: 'Pie Chart' },
    'magnifying-glass-chart': { icon: 'fa-solid fa-magnifying-glass-chart', label: 'Analysis' },
  },
  status: {
    'check-circle': { icon: 'fa-solid fa-circle-check', label: 'Check' },
    'circle-exclamation': { icon: 'fa-solid fa-circle-exclamation', label: 'Warning' },
    'circle-info': { icon: 'fa-solid fa-circle-info', label: 'Info' },
    'shield': { icon: 'fa-solid fa-shield', label: 'Shield' },
  },
};

/** Default icon variant for each group */
const DEFAULT_VARIANTS: Record<BanIconGroup, BanIconVariant> = {
  financial: 'dollar',
  users: 'users',
  performance: 'gauge',
  engagement: 'heart',
  commerce: 'cart',
  time: 'clock',
  analytics: 'chart-line',
  status: 'check-circle',
};

export interface KpiBasicBanProps {
  /** The name of the metric being displayed */
  metric: string;
  /** The numeric value to display */
  value: number;
  /** Optional label shown below the value */
  label?: string;
  /** Optional timeframe or period description */
  timeframe?: string;
  /** Type of metric for formatting: 'numeric', 'percentage', or 'currency' */
  metricType: MetricType;
  /** Icon group category (financial, users, performance, etc.) */
  iconGroup?: BanIconGroup;
  /** Specific icon variant within the group */
  iconVariant?: BanIconVariant;
  /** Optional custom icon class (FontAwesome) - overrides iconGroup/iconVariant if provided */
  icon?: string;
  /** Color configuration */
  colors?: {
    background: string;
    text: string;
    accent: string;
  };
}

@Component({
  selector: 'phoebe-kpi-basic-ban',
  standalone: true,
  imports: [CommonModule, KpiBanPipe],
  templateUrl: './kpi-basic-ban.component.html',
  styleUrls: ['./kpi-basic-ban.component.scss'],
})
export class KpiBasicBanComponent {
  @Input() props!: KpiBasicBanProps;
  @Input() theme: 'light' | 'dark' = 'light';

  get iconClass(): string {
    // Custom icon takes precedence
    if (this.props.icon) {
      return this.props.icon;
    }

    // Use iconGroup/iconVariant if provided
    if (this.props.iconGroup) {
      const group = BAN_ICON_GROUPS[this.props.iconGroup];
      if (group) {
        const variant = this.props.iconVariant || DEFAULT_VARIANTS[this.props.iconGroup];
        const iconDef = group[variant];
        if (iconDef) {
          return iconDef.icon;
        }
      }
    }

    return '';
  }

  get hasIcon(): boolean {
    return this.iconClass.length > 0;
  }

  get accentStyle(): string {
    return this.props.colors?.accent || '#1a5f9c';
  }
}
