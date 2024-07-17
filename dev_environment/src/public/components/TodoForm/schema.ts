import { z } from 'zod';
import { Priority, Status } from '../../../common/types';

export const schema = z.object({
  title: z.string().min(3),
  status: z.enum(Object.values(Status) as [Status]),
  priority: z.enum(Object.values(Priority) as [Priority]),
});

export type FieldValues = z.infer<typeof schema>;
