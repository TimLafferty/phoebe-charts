# Consuming Phoebe Charts in an External App

## Quick Start

### 1. Install the Package

In your Angular application:

```bash
npm install @your-username/phoebe-charts d3 @types/d3
```

Or if using unscoped name:

```bash
npm install phoebe-charts d3 @types/d3
```

### 2. Import and Use in Component

**app.component.ts:**
```typescript
import { Component } from '@angular/core';
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My App with Phoebe Charts';

  chartData: DataPoint[] = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 },
    { x: 4, y: 50 },
    { x: 5, y: 75 }
  ];

  chartConfig: ChartConfig = {
    width: 800,
    height: 400,
    xAxisLabel: 'Time (hours)',
    yAxisLabel: 'Temperature (°F)',
    showGrid: true,
    animate: true,
    lineColor: '#2563eb',
    lineWidth: 3,
    pointRadius: 5
  };
}
```

**app.component.html:**
```html
<div class="container">
  <h1>{{ title }}</h1>
  
  <div class="chart-container">
    <phoebe-line-chart
      [data]="chartData"
      [config]="chartConfig">
    </phoebe-line-chart>
  </div>
</div>
```

**app.component.scss:**
```scss
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #1e293b;
  margin-bottom: 2rem;
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### 3. Add Global Styles (Optional)

**styles.scss:**
```scss
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
  margin: 0;
  padding: 0;
}
```

## Advanced Usage

### Dynamic Data Updates

```typescript
import { Component, OnInit } from '@angular/core';
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';
import { interval } from 'rxjs';

@Component({
  selector: 'app-live-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <phoebe-line-chart
      [data]="liveData"
      [config]="config">
    </phoebe-line-chart>
  `
})
export class LiveChartComponent implements OnInit {
  liveData: DataPoint[] = [];
  config: ChartConfig = {
    width: 800,
    height: 400,
    xAxisLabel: 'Time',
    yAxisLabel: 'Value',
    animate: true
  };

  ngOnInit() {
    // Simulate live data updates
    interval(1000).subscribe(() => {
      const newPoint: DataPoint = {
        x: this.liveData.length,
        y: Math.random() * 100
      };
      
      this.liveData = [...this.liveData, newPoint];
      
      // Keep only last 20 points
      if (this.liveData.length > 20) {
        this.liveData = this.liveData.slice(-20);
      }
    });
  }
}
```

### Multiple Charts

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LineChartComponent],
  template: `
    <div class="dashboard">
      <div class="chart-card" *ngFor="let dataset of datasets">
        <h3>{{ dataset.title }}</h3>
        <phoebe-line-chart
          [data]="dataset.data"
          [config]="dataset.config">
        </phoebe-line-chart>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem;
    }
    
    .chart-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
      margin: 0 0 1rem 0;
      color: #1e293b;
    }
  `]
})
export class DashboardComponent {
  datasets = [
    {
      title: 'Sales Data',
      data: this.generateRandomData(),
      config: { width: 400, height: 250, lineColor: '#3b82f6' }
    },
    {
      title: 'Traffic Data',
      data: this.generateRandomData(),
      config: { width: 400, height: 250, lineColor: '#10b981' }
    },
    {
      title: 'Revenue Data',
      data: this.generateRandomData(),
      config: { width: 400, height: 250, lineColor: '#f59e0b' }
    }
  ];

  private generateRandomData(): DataPoint[] {
    return Array.from({ length: 10 }, (_, i) => ({
      x: i,
      y: Math.random() * 100
    }));
  }
}
```

### Responsive Chart

```typescript
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LineChartComponent, DataPoint, ChartConfig } from '@your-username/phoebe-charts';

@Component({
  selector: 'app-responsive-chart',
  standalone: true,
  imports: [LineChartComponent],
  template: `
    <div #container class="chart-wrapper">
      <phoebe-line-chart
        [data]="data"
        [config]="config">
      </phoebe-line-chart>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      width: 100%;
      height: 400px;
    }
  `]
})
export class ResponsiveChartComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;
  
  data: DataPoint[] = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 }
  ];
  
  config: ChartConfig = {
    width: 800,
    height: 400,
    animate: true
  };

  ngOnInit() {
    this.updateChartSize();
    window.addEventListener('resize', () => this.updateChartSize());
  }

  private updateChartSize() {
    if (this.container) {
      const width = this.container.nativeElement.offsetWidth;
      this.config = { ...this.config, width };
    }
  }
}
```

## Testing with the Library

Create a test file for your component:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LineChartComponent } from '@your-username/phoebe-charts';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, LineChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render chart with data', () => {
    expect(component.chartData.length).toBeGreaterThan(0);
  });
});
```

## Troubleshooting

### Module not found
Ensure the package is installed:
```bash
npm list @your-username/phoebe-charts
```

If not installed:
```bash
npm install @your-username/phoebe-charts
```

### Type errors
Install D3 types:
```bash
npm install --save-dev @types/d3
```

### Chart not displaying
1. Check that the container has dimensions
2. Verify data is properly formatted
3. Open browser console for errors

### Animations not working
Ensure `animate: true` is set in config and `@angular/animations` is installed:
```bash
npm install @angular/animations
```

Add to `app.config.ts`:
```typescript
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // ... other providers
  ]
};
```

