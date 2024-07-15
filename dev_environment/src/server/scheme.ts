import { schema } from '@osd/config-schema';

export const schemeTodo = schema.object({
  title: schema.string({ minLength: 3 }),
  status: schema.maybe(schema.string()),
  priority: schema.string(),
  isCompleted: schema.boolean(),
});

export const schemeParamId = schema.object({
  id: schema.string(),
});

export const schemeIds = schema.object({
  ids: schema.arrayOf(schema.string()),
});
