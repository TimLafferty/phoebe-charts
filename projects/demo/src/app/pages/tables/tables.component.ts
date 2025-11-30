import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HeatmapComponent,
  HeatmapData,
  HeatmapDataPoint,
  HeatmapCellEvent,
} from '@timalexlafferty/phoebe-charts';
import { ChartContainerComponent } from '@timalexlafferty/phoebe-charts';
import { ChartDimensions, DEFAULT_CHART_DIMENSIONS } from '@timalexlafferty/phoebe-charts';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule, HeatmapComponent, ChartContainerComponent],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  // Heatmap Demo Data
  heatmapData: HeatmapData = this.generateSampleData();

  // Configuration options
  showValues = true;
  showTooltip = true;
  showLegend = true;
  animate = true;
  cellBorderColor = '#ffffff';
  cellBorderWidth = 1;
  valueFormat = '.0f';


  selectedCell?: HeatmapDataPoint;

  private generateSampleData(): HeatmapData {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
    const cells: HeatmapDataPoint[] = [];

    for (const day of days) {
      for (const hour of hours) {
        cells.push({
          row: day,
          column: hour,
          value: Math.round(Math.random() * 100),
        });
      }
    }

    return {
      rows: days,
      columns: hours,
      cells,
    };
  }

  randomizeData(): void {
    this.heatmapData = this.generateSampleData();
  }

  loadCorrelationMatrix(): void {
    const variables = ['Revenue', 'Expenses', 'Profit', 'Growth', 'Customers'];
    const cells: HeatmapDataPoint[] = [];

    for (const row of variables) {
      for (const col of variables) {
        const value = row === col ? 1 : Math.round((Math.random() * 2 - 1) * 100) / 100;
        cells.push({ row, column: col, value });
      }
    }

    this.heatmapData = { rows: variables, columns: variables, cells };
    this.valueFormat = '.2f';
  }

  loadActivityData(): void {
    this.heatmapData = this.generateSampleData();
    this.valueFormat = '.0f';
  }

  loadTemperatureData(): void {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const cities = ['NYC', 'LA', 'Chicago', 'Miami', 'Seattle'];
    const cells: HeatmapDataPoint[] = [];

    const temps: Record<string, number[]> = {
      'NYC': [32, 35, 45, 55, 65, 75, 80, 78, 70, 58, 48, 38],
      'LA': [58, 60, 62, 65, 68, 72, 78, 80, 78, 72, 65, 58],
      'Chicago': [25, 30, 40, 52, 62, 72, 78, 76, 68, 55, 42, 30],
      'Miami': [68, 70, 74, 78, 82, 85, 88, 88, 86, 82, 76, 70],
      'Seattle': [42, 45, 48, 52, 58, 64, 68, 68, 62, 54, 46, 42],
    };

    for (const city of cities) {
      for (let i = 0; i < months.length; i++) {
        cells.push({
          row: city,
          column: months[i],
          value: temps[city][i] + Math.round((Math.random() - 0.5) * 5),
        });
      }
    }

    this.heatmapData = { rows: cities, columns: months, cells };
    this.valueFormat = '.0f';
  }

  resetToDefaults(): void {
    this.showValues = true;
    this.showTooltip = true;
    this.showLegend = true;
    this.animate = true;
    this.cellBorderColor = '#ffffff';
    this.cellBorderWidth = 1;
    this.valueFormat = '.0f';
    this.heatmapData = this.generateSampleData();
    this.selectedCell = undefined;
  }

  onCellClick(event: HeatmapCellEvent): void {
    this.selectedCell = event.cell;
  }

  onCellHover(event: HeatmapCellEvent): void {
    // Could be used for additional hover effects
  }
}
