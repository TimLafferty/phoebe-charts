import { z } from 'zod';
import { chartDimensionsSchema, heightSchema, marginsSchema, paddingSchema, widthSchema } from '../shared/validation';

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
    // Angular parity
    dimensions: chartDimensionsSchema.optional(),

    // API overrides / extras
    width: widthSchema.optional(),
    height: heightSchema.optional(),
    margins: marginsSchema.optional(),
    padding: paddingSchema.optional(),
    cellPadding: z.number().min(0).max(0.5).default(0.025),
    nullColor: z.string().max(50).default('#ccc'),
    minColor: z.string().max(50).default('#1A5F9C'),
    maxColor: z.string().max(50).default('#FF6B6B'),
    fontFamily: z.string().max(200).default('system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'),
    fontSize: z.number().min(6).max(32).default(12),
    rotateXLabels: z.boolean().default(false),
  })
  .default({});

export const heatmapRequestSchema = z.object({
  data: heatmapDataSchema,
  options: heatmapOptionsSchema,
});

export type HeatmapRequest = z.infer<typeof heatmapRequestSchema>;
