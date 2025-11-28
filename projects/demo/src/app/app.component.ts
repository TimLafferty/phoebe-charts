import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LineChartComponent,
  ChartContainerComponent,
  LineChartDataPoint,
  ChartDimensions,
} from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LineChartComponent, ChartContainerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Phoebe Charts Demo';

  sampleData: LineChartDataPoint[] = [
    { x: 0, y: 30 },
    { x: 1, y: 45 },
    { x: 2, y: 35 },
    { x: 3, y: 60 },
    { x: 4, y: 50 },
    { x: 5, y: 75 },
    { x: 6, y: 65 },
    { x: 7, y: 90 },
    { x: 8, y: 80 },
    { x: 9, y: 100 },
  ];

  chartDimensions: ChartDimensions = {
    width: 800,
    height: 400,
  };

  randomizeData(): void {
    this.sampleData = this.sampleData.map((point, index) => ({
      x: index,
      y: Math.floor(Math.random() * 100) + 10,
    }));
  }
}
