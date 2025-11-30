import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LineChartComponent, LineChartDataPoint } from '@timalexlafferty/phoebe-charts';
import { ChartContainerComponent } from '@timalexlafferty/phoebe-charts';
import { ChartDimensions } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [CommonModule, FormsModule, LineChartComponent, ChartContainerComponent],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  chartData: LineChartDataPoint[] = this.generateRandomData();

  chartDimensions: ChartDimensions = {
    width: 700,
    height: 400,
    margins: { top: 20, right: 30, bottom: 50, left: 60 }
  };

  // Configuration options
  showGrid = true;
  animate = true;
  lineColor = '#3b82f6';
  strokeWidth = 2;

  colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f59e0b' },
  ];

  private generateRandomData(): LineChartDataPoint[] {
    return Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: Math.floor(Math.random() * 80) + 20,
    }));
  }

  randomizeData(): void {
    this.chartData = this.generateRandomData();
  }

  loadTrendingData(): void {
    this.chartData = Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: 20 + i * 7 + Math.floor(Math.random() * 10),
    }));
  }

  loadSeasonalData(): void {
    const seasonal = [30, 45, 60, 80, 95, 100, 95, 80, 60, 45, 30, 25];
    this.chartData = seasonal.map((y, x) => ({
      x,
      y: y + Math.floor(Math.random() * 10) - 5,
    }));
  }

  loadVolatileData(): void {
    this.chartData = Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: 50 + Math.floor(Math.random() * 80) - 40,
    }));
  }
}
