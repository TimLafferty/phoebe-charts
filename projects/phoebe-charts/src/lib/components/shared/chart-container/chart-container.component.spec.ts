import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartContainerComponent } from './chart-container.component';

describe('ChartContainerComponent', () => {
  let component: ChartContainerComponent;
  let fixture: ComponentFixture<ChartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title when provided', () => {
    component.chartTitle = 'Test Chart';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.chart-title')?.textContent).toContain('Test Chart');
  });

  it('should display subtitle when provided', () => {
    component.chartTitle = 'Test Chart';
    component.chartSubtitle = 'Test Subtitle';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.chart-subtitle')?.textContent).toContain('Test Subtitle');
  });

  it('should display footer when provided', () => {
    component.chartFooter = 'Test Footer';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.chart-footer-text')?.textContent).toContain('Test Footer');
  });

  it('should use context values when provided', () => {
    component.context = {
      chartTitle: 'Context Title',
      chartSubtitle: 'Context Subtitle',
      chartFooter: 'Context Footer',
    };
    fixture.detectChanges();
    expect(component.title).toBe('Context Title');
    expect(component.subtitle).toBe('Context Subtitle');
    expect(component.footer).toBe('Context Footer');
  });

  it('should prioritize direct inputs over context', () => {
    component.chartTitle = 'Direct Title';
    component.context = {
      chartTitle: 'Context Title',
    };
    fixture.detectChanges();
    expect(component.title).toBe('Direct Title');
  });
});

