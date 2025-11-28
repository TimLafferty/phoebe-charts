import { TestBed } from '@angular/core/testing';
import { ChartDefaultsService } from './chart-defaults.service';
import { DEFAULT_THEME, DARK_THEME } from '../models/chart-utilities/chart-themes.model';

describe('ChartDefaultsService', () => {
  let service: ChartDefaultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDefaultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Font Defaults', () => {
    it('should return default font family', () => {
      expect(service.getFontFamily()).toBe('system-ui, -apple-system, sans-serif');
    });

    it('should return default title font size', () => {
      expect(service.getTitleFontSize()).toBe(20);
    });

    it('should return default label font size', () => {
      expect(service.getLabelFontSize()).toBe(12);
    });
  });

  describe('Color Defaults', () => {
    it('should return default primary color', () => {
      expect(service.getPrimaryColor()).toBe('#3b82f6');
    });

    it('should return default grid color', () => {
      expect(service.getGridColor()).toBe('#e5e7eb');
    });

    it('should return series colors array', () => {
      const colors = service.getSeriesColors();
      expect(colors.length).toBeGreaterThan(0);
      expect(colors[0]).toBe('#3b82f6');
    });

    it('should cycle through series colors', () => {
      const colors = service.getSeriesColors();
      expect(service.getSeriesColor(0)).toBe(colors[0]);
      expect(service.getSeriesColor(colors.length)).toBe(colors[0]);
    });
  });

  describe('Animation Defaults', () => {
    it('should return default animation duration', () => {
      expect(service.getAnimationDuration()).toBe(1000);
    });
  });

  describe('Dimension Defaults', () => {
    it('should return default width', () => {
      expect(service.getDefaultWidth()).toBe(600);
    });

    it('should return default height', () => {
      expect(service.getDefaultHeight()).toBe(400);
    });

    it('should return default margins', () => {
      const margins = service.getDefaultMargins();
      expect(margins.top).toBeDefined();
      expect(margins.right).toBeDefined();
      expect(margins.bottom).toBeDefined();
      expect(margins.left).toBeDefined();
    });
  });

  describe('Theme Management', () => {
    it('should start with default theme', () => {
      expect(service.getCurrentTheme().name).toBe('default');
    });

    it('should switch to dark theme', () => {
      service.setDarkTheme();
      expect(service.getCurrentTheme().name).toBe('dark');
      expect(service.getBackgroundColor()).toBe('#1f2937');
    });

    it('should switch back to light theme', () => {
      service.setDarkTheme();
      service.setLightTheme();
      expect(service.getCurrentTheme().name).toBe('default');
      expect(service.getBackgroundColor()).toBe('#ffffff');
    });

    it('should apply custom theme', () => {
      service.setCustomTheme({
        name: 'custom',
        colors: {
          primary: '#ff0000',
        },
      });
      expect(service.getPrimaryColor()).toBe('#ff0000');
    });

    it('should reset to defaults', () => {
      service.setDarkTheme();
      service.resetToDefaults();
      expect(service.getCurrentTheme().name).toBe('default');
    });
  });

  describe('Configuration Defaults', () => {
    it('should return grid enabled status', () => {
      expect(typeof service.isGridEnabled()).toBe('boolean');
    });

    it('should return axis enabled status', () => {
      expect(typeof service.isXAxisEnabled()).toBe('boolean');
      expect(typeof service.isYAxisEnabled()).toBe('boolean');
    });

    it('should return responsive status', () => {
      expect(service.isResponsive()).toBe(true);
    });
  });
});

