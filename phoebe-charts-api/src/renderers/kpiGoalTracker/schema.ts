import { z } from 'zod';
import { widthSchema } from '../shared/validation';

export const kpiGoalTrackerDataSchema = z.object({
  // Angular parity
  title: z.string().max(200).default(''),
  currentValue: z.number().finite().min(0).max(1_000_000_000_000),
  goalValue: z.number().finite().min(0).max(1_000_000_000_000),
  paceValue: z.number().finite().min(0).max(1_000_000_000_000).optional(),
  paceLabel: z.string().max(100).default('Pace'),
  benchmarkValue: z.number().finite().min(0).max(1_000_000_000_000).optional(),
  benchmarkLabel: z.string().max(100).default('Prev. Period'),
  unit: z.string().max(50).optional(),
  startDate: z.string().max(50).optional(),
  endDate: z.string().max(50).optional(),
});

export const kpiGoalTrackerOptionsSchema = z
  .object({
    width: widthSchema,
    height: z.number().int().min(30).max(300).default(44),
    theme: z.enum(['light', 'dark']).default('light'),
    roundness: z.number().min(0).max(20).default(2),
    color: z.string().max(50).default('#1a5f9c'),
    fontFamily: z.string().max(200).default('system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif'),
    fontSize: z.number().min(6).max(32).default(12),
    idPrefix: z.string().max(50).default('kgt'),
  })
  .default({});

export const kpiGoalTrackerRequestSchema = z.object({
  data: kpiGoalTrackerDataSchema,
  options: kpiGoalTrackerOptionsSchema,
});

export type KpiGoalTrackerRequest = z.infer<typeof kpiGoalTrackerRequestSchema>;
