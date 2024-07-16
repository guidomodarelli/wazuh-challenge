import { schema } from '@osd/config-schema';

export const schemeTodo = schema.object({
  id: schema.maybe(schema.string()),
  createdAt: schema.maybe(schema.string()),
  title: schema.string({ minLength: 3 }),
  status: schema.maybe(schema.string()),
  priority: schema.string(),
  assignee: schema.maybe(schema.string()),
  tags: schema.maybe(schema.arrayOf(schema.string())),
});

export const schemeParamId = schema.object({
  id: schema.string(),
});

export const schemeIds = schema.object({
  ids: schema.arrayOf(schema.string()),
});
