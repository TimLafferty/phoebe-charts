import { z } from 'zod';

const heatmapWidthSchema = z.number().int().min(50).max(4000).default(800);
const heatmapHeightSchema = z.number().int().min(50).max(4000).default(500);

const heatmapMarginsSchema = z
  .object({
    top: z.number().int().min(0).max(1000).default(20),
    right: z.number().int().min(0).max(1000).default(20),
    bottom: z.number().int().min(0).max(1000).default(80),
    left: z.number().int().min(0).max(1000).default(80),
  })
  .default({});

export const heatmapCellSchema = z.object({
  row: z.string().min(1).max(200),
  column: z.string().min(1).max(200),
  value: z.number().nullable(),
});

export const heatmapDataSchema = z.object({
  rows: z.array(z.string().min(1).max(200)).min(1).max(500),
  columns: z.array(z.string().min(1).max(200)).min(1).max(500),
  cells: z.array(heatmapCellSchema).min(1).max(200000),
});

export const heatmapOptionsSchema = z
  .object({
    width: heatmapWidthSchema,
    height: heatmapHeightSchema,
    margins: heatmapMarginsSchema,
    cellPadding: z.number().min(0).max(0.5).default(0.05),
    nullColor: z.string().max(50).default('#cbd5e1'),
    minColor: z.string().max(50).default('#1A5F9C'),
    maxColor: z.string().max(50).default('#FF6B6B'),
    fontFamily: z.string().max(200).default('system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'),
    fontSize: z.number().min(6).max(32).default(12),
    rotateXLabels: z.boolean().default(true),
  })
  .default({});

export const heatmapRequestSchema = z.object({
  data: heatmapDataSchema,
  options: heatmapOptionsSchema,
});

export type HeatmapRequest = z.infer<typeof heatmapRequestSchema>;
