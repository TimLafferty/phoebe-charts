import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ChartCard {
  title: string;
  description: string;
  route: string;
  status: 'stable' | 'beta' | 'planned';
  category: 'charts' | 'tables';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  charts: ChartCard[] = [
    {
      title: 'Line Chart',
      description: 'Time series and trend visualization with smooth curves and animations.',
      route: '/charts/line',
      status: 'stable',
      category: 'charts',
    },
    {
      title: 'Heatmap',
      description: 'Matrix visualization with color gradients for correlation and density data.',
      route: '/tables/heatmap',
      status: 'beta',
      category: 'tables',
    },
    {
      title: 'Bar Chart',
      description: 'Categorical data comparison with vertical and horizontal orientations.',
      route: '/charts/bar',
      status: 'planned',
      category: 'charts',
    },
    {
      title: 'Pie Chart',
      description: 'Part-to-whole relationships with interactive segments.',
      route: '/charts/pie',
      status: 'planned',
      category: 'charts',
    },
    {
      title: 'Scatter Plot',
      description: 'Correlation and distribution analysis with multiple data series.',
      route: '/charts/scatter',
      status: 'planned',
      category: 'charts',
    },
  ];

  get availableCharts(): ChartCard[] {
    return this.charts.filter(c => c.status !== 'planned');
  }

  get plannedCharts(): ChartCard[] {
    return this.charts.filter(c => c.status === 'planned');
  }
}
