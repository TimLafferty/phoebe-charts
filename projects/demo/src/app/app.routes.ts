import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'charts/line',
        loadComponent: () =>
          import('./pages/charts/line/line.component').then(
            (m) => m.LineComponent
          ),
      },
      {
        path: 'charts/bar',
        loadComponent: () =>
          import('./pages/charts/bar/bar.component').then((m) => m.BarComponent),
      },
      {
        path: 'charts/pie',
        loadComponent: () =>
          import('./pages/charts/pie/pie.component').then((m) => m.PieComponent),
      },
      {
        path: 'charts/scatter',
        loadComponent: () =>
          import('./pages/charts/scatter/scatter.component').then(
            (m) => m.ScatterComponent
          ),
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./pages/tables/tables.component').then(
            (m) => m.TablesComponent
          ),
      },
      {
        path: 'tables/heatmap',
        loadComponent: () =>
          import('./pages/tables/tables.component').then(
            (m) => m.TablesComponent
          ),
      },
      {
        path: 'kpi-cards',
        loadComponent: () =>
          import('./pages/kpi-cards/kpi-component-gallery.component').then(
            (m) => m.KpiComponentGalleryComponent
          ),
      },
    ],
  },
];

