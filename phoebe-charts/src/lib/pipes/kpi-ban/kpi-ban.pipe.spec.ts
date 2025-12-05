import { KpiBanPipe } from './kpi-ban.pipe';

describe('KpiBanPipe', () => {
  let pipe: KpiBanPipe;

  beforeEach(() => {
    pipe = new KpiBanPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('null/undefined handling', () => {
    it('should return empty string for null', () => {
      expect(pipe.transform(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(pipe.transform(undefined)).toBe('');
    });

    it('should return empty string for NaN', () => {
      expect(pipe.transform(NaN)).toBe('');
    });
  });

  describe('values < 1 (max 3 decimal places)', () => {
    it('should format 0 as 0.000', () => {
      expect(pipe.transform(0)).toBe('0.000');
    });

    it('should format 0.1 with 3 decimal places', () => {
      expect(pipe.transform(0.1)).toBe('0.100');
    });

    it('should format 0.123 with 3 decimal places', () => {
      expect(pipe.transform(0.123)).toBe('0.123');
    });

    it('should format 0.1234 rounded to 3 decimal places', () => {
      expect(pipe.transform(0.1234)).toBe('0.123');
    });

    it('should format 0.001 preserving leading zeros', () => {
      expect(pipe.transform(0.001)).toBe('0.001');
    });

    it('should format negative values < 1', () => {
      expect(pipe.transform(-0.5)).toBe('-0.500');
    });
  });

  describe('values 1-99 (1 decimal place)', () => {
    it('should format 1 with 1 decimal place', () => {
      expect(pipe.transform(1)).toBe('1.0');
    });

    it('should format 45.67 with 1 decimal place', () => {
      expect(pipe.transform(45.67)).toBe('45.7');
    });

    it('should format 99.9 with 1 decimal place', () => {
      expect(pipe.transform(99.9)).toBe('99.9');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-45.6)).toBe('-45.6');
    });
  });

  describe('values 100-999 (0 decimal places)', () => {
    it('should format 100 with no decimal places', () => {
      expect(pipe.transform(100)).toBe('100');
    });

    it('should format 456.78 with no decimal places', () => {
      expect(pipe.transform(456.78)).toBe('457');
    });

    it('should format 999 with no decimal places', () => {
      expect(pipe.transform(999)).toBe('999');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-500)).toBe('-500');
    });
  });

  describe('values 1,000-9,999 (X.XXK)', () => {
    it('should format 1000 as 1.00K', () => {
      expect(pipe.transform(1000)).toBe('1.00K');
    });

    it('should format 4567 as 4.57K', () => {
      expect(pipe.transform(4567)).toBe('4.57K');
    });

    it('should format 9999 as 10.00K', () => {
      expect(pipe.transform(9999)).toBe('10.00K');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-5000)).toBe('-5.00K');
    });
  });

  describe('values 10,000-99,999 (XX.XK)', () => {
    it('should format 10000 as 10.0K', () => {
      expect(pipe.transform(10000)).toBe('10.0K');
    });

    it('should format 45678 as 45.7K', () => {
      expect(pipe.transform(45678)).toBe('45.7K');
    });

    it('should format 99999 as 100.0K', () => {
      expect(pipe.transform(99999)).toBe('100.0K');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-50000)).toBe('-50.0K');
    });
  });

  describe('values 100,000-999,999 (XXXK)', () => {
    it('should format 100000 as 100K', () => {
      expect(pipe.transform(100000)).toBe('100K');
    });

    it('should format 456789 as 457K', () => {
      expect(pipe.transform(456789)).toBe('457K');
    });

    it('should format 999999 as 1000K', () => {
      expect(pipe.transform(999999)).toBe('1000K');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-500000)).toBe('-500K');
    });
  });

  describe('values 1,000,000-99,999,999 (X.XM)', () => {
    it('should format 1000000 as 1.0M', () => {
      expect(pipe.transform(1000000)).toBe('1.0M');
    });

    it('should format 45678901 as 45.7M', () => {
      expect(pipe.transform(45678901)).toBe('45.7M');
    });

    it('should format 99999999 as 100.0M', () => {
      expect(pipe.transform(99999999)).toBe('100.0M');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-50000000)).toBe('-50.0M');
    });
  });

  describe('values >= 100,000,000 (XXXM)', () => {
    it('should format 100000000 as 100M', () => {
      expect(pipe.transform(100000000)).toBe('100M');
    });

    it('should format 456789012 as 457M', () => {
      expect(pipe.transform(456789012)).toBe('457M');
    });

    it('should format 1000000000 as 1000M', () => {
      expect(pipe.transform(1000000000)).toBe('1000M');
    });

    it('should format negative values in range', () => {
      expect(pipe.transform(-500000000)).toBe('-500M');
    });
  });
});
