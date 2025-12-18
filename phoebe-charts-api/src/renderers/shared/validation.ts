import { z } from 'zod';

export const widthSchema = z.number().int().min(50).max(4000).default(600);
export const heightSchema = z.number().int().min(50).max(4000).default(400);

export const marginsSchema = z
  .object({
    top: z.number().int().min(0).max(1000).default(20),
    right: z.number().int().min(0).max(1000).default(30),
    bottom: z.number().int().min(0).max(1000).default(40),
    left: z.number().int().min(0).max(1000).default(50),
  })
  .default({});

export const paddingSchema = z
  .object({
    top: z.number().int().min(0).max(1000).default(0),
    right: z.number().int().min(0).max(1000).default(0),
    bottom: z.number().int().min(0).max(1000).default(0),
    left: z.number().int().min(0).max(1000).default(0),
  })
  .default({});

export const chartDimensionsSchema = z
  .object({
    width: widthSchema.optional(),
    height: heightSchema.optional(),
    minWidth: z.number().int().min(0).max(4000).optional(),
    minHeight: z.number().int().min(0).max(4000).optional(),
    maxWidth: z.number().int().min(0).max(4000).optional(),
    maxHeight: z.number().int().min(0).max(4000).optional(),
    aspectRatio: z.number().positive().max(100).optional(),
    margins: marginsSchema.optional(),
    padding: paddingSchema.optional(),
    responsive: z.boolean().optional(),
    maintainAspectRatio: z.boolean().optional(),
  })
  .default({});
