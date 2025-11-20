import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  note: z.string(),
  type: z.string(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
  dueDate: z.string(),
  facility: z.string(),
});
