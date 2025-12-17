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

