import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  status?: 'stable' | 'beta' | 'planned';
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'Phoebe Charts';

  navItems: NavItem[] = [
    {
      label: 'Home',
      path: '/',
      icon: 'home',
    },
    {
      label: 'Charts',
      path: '/charts',
      icon: 'chart',
      children: [
        { label: 'Line Chart', path: '/charts/line', status: 'stable' },
        { label: 'Bar Chart', path: '/charts/bar', status: 'planned' },
        { label: 'Pie Chart', path: '/charts/pie', status: 'planned' },
        { label: 'Scatter Plot', path: '/charts/scatter', status: 'planned' },
      ],
    },
    {
      label: 'Tables',
      path: '/tables',
      icon: 'table',
      children: [
        { label: 'Heatmap', path: '/tables/heatmap', status: 'beta' },
        { label: 'MQY Table', path: '/tables/mqy-table', status: 'beta' },
        { label: 'MQYTD Table', path: '/tables/mqytd-table', status: 'beta' },
      ],
    },
    {
      label: 'KPI Cards',
      path: '/kpi-cards',
      icon: 'card',
      children: [
        { label: 'Gallery', path: '/kpi-cards', status: 'beta' },
      ],
    },
    {
      label: 'Theme',
      path: '/theme-config',
      icon: 'palette',
      children: [
        { label: 'Configuration', path: '/theme-config', status: 'beta' },
      ],
    },
  ];

  expandedGroups = new Set<string>(['Charts', 'Tables', 'KPI Cards', 'Theme']);

  toggleGroup(label: string): void {
    if (this.expandedGroups.has(label)) {
      this.expandedGroups.delete(label);
    } else {
      this.expandedGroups.add(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedGroups.has(label);
  }
}
