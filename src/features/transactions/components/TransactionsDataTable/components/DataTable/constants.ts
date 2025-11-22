import { z } from 'zod';

export const schema = z.object({
  id: z.string(),
  note: z.string(),
  category: z.string(),
  categoryParent: z.string().nullable(),
  type: z.string(),
  amount: z.number(),
  amountDecimal: z.number(),
  status: z.string(),
  date: z.string(),
  dueDate: z.string(),
  facility: z.string(),
});
