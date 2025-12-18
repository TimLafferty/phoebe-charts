import { z } from 'zod';
import { chartDimensionsSchema, heightSchema, marginsSchema, widthSchema } from '../shared/validation';

export const lineChartPointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const lineChartOptionsSchema = z
  .object({
    // Angular parity
    dimensions: chartDimensionsSchema.optional(),
    xAxisLabel: z.string().max(200).optional(),
    yAxisLabel: z.string().max(200).optional(),
    showGrid: z.boolean().default(true),
    animate: z.boolean().default(true),
    lineColor: z.string().max(50).default('#3b82f6'),
    strokeWidth: z.number().min(0.5).max(20).default(2),

    // API overrides / extras
    width: widthSchema.optional(),
    height: heightSchema.optional(),
    margins: marginsSchema.optional(),
    showPoints: z.boolean().default(true),
    pointRadius: z.number().min(0.5).max(20).default(4),
    fontFamily: z.string().max(200).default('system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'),
    fontSize: z.number().min(6).max(32).default(12),
  })
  .default({});

export const lineChartRequestSchema = z.object({
  data: z.array(lineChartPointSchema).min(2).max(20000),
  options: lineChartOptionsSchema,
});

export type LineChartRequest = z.infer<typeof lineChartRequestSchema>;
