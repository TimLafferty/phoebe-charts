import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FontOption {
  name: string;
  value: string;
  preview: string;
}

interface ColorConfig {
  primary: string;
  secondary: string;
  highlight: string;
}

interface FontSetting {
  family: string;
  weight: number;
  uppercase: boolean;
}

interface FontConfig {
  base: FontSetting;
  headers: FontSetting;
  display: FontSetting;
}

interface GreyscaleConfig {
  scale: string[];
}

@Component({
  selector: 'app-theme-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-config.component.html',
  styleUrls: ['./theme-config.component.scss'],
})
export class ThemeConfigComponent implements OnInit {
  themeApplied = false;

  fontOptions: FontOption[] = [
    { name: 'Inter', value: '"Inter", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Montserrat', value: '"Montserrat", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Roboto Condensed', value: '"Roboto Condensed", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Google Sans Flex', value: '"Google Sans Flex", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Stack Sans Text', value: '"Stack Sans Text", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Stack Sans Headline', value: '"Stack Sans Headline", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Momo Trust Display', value: '"Momo Trust Display", sans-serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Alfa Slab One', value: '"Alfa Slab One", serif', preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Special Elite', value: '"Special Elite", system-ui', preview: 'The quick brown fox jumps over the lazy dog' },
  ];

  fontWeights = [300, 400, 500, 600, 700, 800];

  fonts: FontConfig = {
    base: { family: '"Inter", sans-serif', weight: 400, uppercase: false },
    headers: { family: '"Montserrat", sans-serif', weight: 600, uppercase: false },
    display: { family: '"Momo Trust Display", sans-serif', weight: 700, uppercase: false },
  };

  colors: ColorConfig = {
    primary: '#1a5f9c',
    secondary: '#5da9e9',
    highlight: '#ff6b6b',
  };

  shadeAmount = 50;
  shadeAmountOptions = [10, 20, 30, 40, 50, 60, 70, 80];

  greyscale: GreyscaleConfig = {
    scale: [
      '#f8fafc', // 50
      '#f1f5f9', // 100
      '#e2e8f0', // 200
      '#cbd5e1', // 300
      '#94a3b8', // 400
      '#64748b', // 500
      '#475569', // 600
      '#334155', // 700
      '#1e293b', // 800
      '#0f172a', // 900
    ],
  };

  greyscalePresets = [
    {
      name: 'Slate',
      scale: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],
    },
    {
      name: 'Gray',
      scale: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827'],
    },
    {
      name: 'Zinc',
      scale: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b'],
    },
    {
      name: 'Neutral',
      scale: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717'],
    },
    {
      name: 'Stone',
      scale: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917'],
    },
  ];

  colorPresets = [
    { name: 'Ocean', primary: '#1a5f9c', secondary: '#5da9e9', highlight: '#ff6b6b' },
    { name: 'Forest', primary: '#166534', secondary: '#22c55e', highlight: '#fbbf24' },
    { name: 'Sunset', primary: '#c2410c', secondary: '#f97316', highlight: '#fcd34d' },
    { name: 'Royal', primary: '#5b21b6', secondary: '#8b5cf6', highlight: '#f472b6' },
    { name: 'Slate', primary: '#334155', secondary: '#64748b', highlight: '#06b6d4' },
  ];

  ngOnInit(): void {
    this.loadSavedTheme();
  }

  loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('phoebe-theme');
    if (savedTheme) {
      try {
        const config = JSON.parse(savedTheme);
        if (config.fonts) this.fonts = config.fonts;
        if (config.colors) this.colors = config.colors;
        if (config.shadeAmount) this.shadeAmount = config.shadeAmount;
        if (config.greyscale) this.greyscale = config.greyscale;
        this.applyTheme();
      } catch (e) {
        console.error('Failed to load saved theme:', e);
      }
    }
  }

  applyPreset(preset: typeof this.colorPresets[0]): void {
    this.colors = { ...preset };
    this.applyTheme();
  }

  applyGreyscalePreset(preset: typeof this.greyscalePresets[0]): void {
    this.greyscale.scale = [...preset.scale];
    this.applyTheme();
  }

  applyTheme(): void {
    const root = document.documentElement;
    root.style.setProperty('--theme-font-base', this.fonts.base.family);
    root.style.setProperty('--theme-font-base-weight', this.fonts.base.weight.toString());
    root.style.setProperty('--theme-font-headers', this.fonts.headers.family);
    root.style.setProperty('--theme-font-headers-weight', this.fonts.headers.weight.toString());
    root.style.setProperty('--theme-font-display', this.fonts.display.family);
    root.style.setProperty('--theme-font-display-weight', this.fonts.display.weight.toString());
    root.style.setProperty('--theme-color-primary', this.colors.primary);
    root.style.setProperty('--theme-color-secondary', this.colors.secondary);
    root.style.setProperty('--theme-color-highlight', this.colors.highlight);
    this.greyscale.scale.forEach((color, index) => {
      const step = index === 0 ? 50 : index * 100;
      root.style.setProperty(`--theme-gray-${step}`, color);
    });
  }

  applyThemeGlobally(): void {
    const root = document.documentElement;

    // Apply fonts globally
    root.style.setProperty('--phoebe-font-family-base', this.fonts.base.family);
    root.style.setProperty('--phoebe-font-weight-base', this.fonts.base.weight.toString());
    root.style.setProperty('--phoebe-text-transform-base', this.fonts.base.uppercase ? 'uppercase' : 'none');
    root.style.setProperty('--phoebe-font-family-headers', this.fonts.headers.family);
    root.style.setProperty('--phoebe-font-weight-headers', this.fonts.headers.weight.toString());
    root.style.setProperty('--phoebe-text-transform-headers', this.fonts.headers.uppercase ? 'uppercase' : 'none');
    root.style.setProperty('--phoebe-font-family-display', this.fonts.display.family);
    root.style.setProperty('--phoebe-font-weight-display', this.fonts.display.weight.toString());
    root.style.setProperty('--phoebe-text-transform-display', this.fonts.display.uppercase ? 'uppercase' : 'none');

    // Apply colors globally
    root.style.setProperty('--phoebe-color-primary', this.colors.primary);
    root.style.setProperty('--phoebe-color-primary-light', this.lightenColor(this.colors.primary, this.shadeAmount));
    root.style.setProperty('--phoebe-color-primary-dark', this.darkenColor(this.colors.primary, this.shadeAmount));
    root.style.setProperty('--phoebe-color-secondary', this.colors.secondary);
    root.style.setProperty('--phoebe-color-secondary-light', this.lightenColor(this.colors.secondary, this.shadeAmount));
    root.style.setProperty('--phoebe-color-secondary-dark', this.darkenColor(this.colors.secondary, this.shadeAmount));
    root.style.setProperty('--phoebe-color-highlight', this.colors.highlight);
    root.style.setProperty('--phoebe-color-highlight-light', this.lightenColor(this.colors.highlight, this.shadeAmount));
    root.style.setProperty('--phoebe-color-highlight-dark', this.darkenColor(this.colors.highlight, this.shadeAmount));

    // Apply greyscale globally
    this.greyscale.scale.forEach((color, index) => {
      const step = index === 0 ? 50 : index * 100;
      root.style.setProperty(`--phoebe-gray-${step}`, color);
    });

    // Store in localStorage for persistence
    const themeConfig = {
      fonts: this.fonts,
      colors: this.colors,
      shadeAmount: this.shadeAmount,
      greyscale: this.greyscale,
    };
    localStorage.setItem('phoebe-theme', JSON.stringify(themeConfig));

    this.themeApplied = true;
    setTimeout(() => this.themeApplied = false, 2000);
  }

  resetTheme(): void {
    this.fonts = {
      base: { family: '"Inter", sans-serif', weight: 400, uppercase: false },
      headers: { family: '"Montserrat", sans-serif', weight: 600, uppercase: false },
      display: { family: '"Momo Trust Display", sans-serif', weight: 700, uppercase: false },
    };
    this.colors = {
      primary: '#1a5f9c',
      secondary: '#5da9e9',
      highlight: '#ff6b6b',
    };
    this.shadeAmount = 50;
    this.greyscale = {
      scale: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a'],
    };
    this.applyTheme();
  }

  copyConfig(): void {
    const config = {
      fonts: this.fonts,
      colors: this.colors,
      shadeAmount: this.shadeAmount,
      greyscale: this.greyscale,
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
  }

  // Color shade utilities
  lightenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  }

  darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00ff) - amt);
    const B = Math.max(0, (num & 0x0000ff) - amt);
    return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
  }

  getGreyscaleLabel(index: number): string {
    return index === 0 ? '50' : (index * 100).toString();
  }
}
