import { schema } from '@osd/config-schema';

export const schemeTodo = schema.object({
  id: schema.maybe(schema.string()),
  createdAt: schema.maybe(schema.string()),
  title: schema.string({ minLength: 3 }),
  status: schema.maybe(schema.string()),
  priority: schema.string(),
  assignee: schema.maybe(schema.string({ minLength: 3 })),
  tags: schema.maybe(schema.arrayOf(schema.string({ minLength: 3 }))),
});

export const schemeParamId = schema.object({
  id: schema.string(),
});

export const schemeIds = schema.object({
  ids: schema.arrayOf(schema.string()),
});
