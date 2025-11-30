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
      ],
    },
  ];

  expandedGroups = new Set<string>(['Charts', 'Tables']);

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
