import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { LineChartDataPoint } from '../../../../models/chart-data/line-chart-data.model';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  const mockData: LineChartDataPoint[] = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
    { x: 3, y: 25 },
    { x: 4, y: 30 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SVG element', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render line path when data is provided', () => {
    component.data = mockData;
    component.config = { animate: false };
    fixture.detectChanges();

    const path = fixture.nativeElement.querySelector('path.line');
    expect(path).toBeTruthy();
    expect(path.getAttribute('d')).toBeTruthy();
  });

  it('should render data points as circles', () => {
    component.data = mockData;
    component.config = { animate: false };
    fixture.detectChanges();

    const circles = fixture.nativeElement.querySelectorAll('circle.dot');
    expect(circles.length).toBe(mockData.length);
  });

  it('should apply custom line color', () => {
    component.data = mockData;
    component.lineColor = '#ff0000';
    component.config = { animate: false };
    fixture.detectChanges();

    const path = fixture.nativeElement.querySelector('path.line');
    expect(path.getAttribute('stroke')).toBe('#ff0000');
  });

  it('should render axes', () => {
    component.data = mockData;
    component.config = { animate: false };
    fixture.detectChanges();

    const xAxis = fixture.nativeElement.querySelector('.x-axis');
    const yAxis = fixture.nativeElement.querySelector('.y-axis');
    expect(xAxis).toBeTruthy();
    expect(yAxis).toBeTruthy();
  });

  it('should render grid when showGrid is true', () => {
    component.data = mockData;
    component.config = { showGrid: true, animate: false };
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeTruthy();
  });

  it('should not render grid when showGrid is false', () => {
    component.data = mockData;
    component.config = { showGrid: false, animate: false };
    fixture.detectChanges();

    const grid = fixture.nativeElement.querySelector('.grid');
    expect(grid).toBeNull();
  });

  it('should clear chart when data is empty', () => {
    component.data = mockData;
    component.config = { animate: false };
    fixture.detectChanges();

    component.data = [];
    component.ngOnChanges({
      data: { currentValue: [], previousValue: mockData, firstChange: false, isFirstChange: () => false }
    });
    fixture.detectChanges();

    const path = fixture.nativeElement.querySelector('path.line');
    expect(path).toBeNull();
  });
});
