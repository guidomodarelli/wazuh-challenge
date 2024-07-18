import { faker } from '@faker-js/faker';
import { TodoPort } from '../../ports/TodoPort';
import { Priority } from '../entities/Priority';
import { Status } from '../entities/Status';
import { TodoEntity } from '../entities/TodoEntity';

export const addSampleTodosUseCase = (todoPort: TodoPort) => (fakes = 100) => {
  const todoSamples: TodoEntity[] = [];
  faker.setDefaultRefDate(new Date());
  const persons = faker.helpers.multiple(faker.person.firstName, { count: 7 });
  const tags = faker.helpers.multiple(faker.lorem.word, { count: 27 });
  for (let i = 0; i < fakes; i++) {
    const newTodo = {
      id: faker.string.uuid(),
      createdAt: faker.date.recent({ days: 27 }).toISOString(),
      priority: faker.helpers.enumValue(Priority),
      status: faker.helpers.enumValue(Status),
      title: faker.lorem.sentence(),
      tags: faker.helpers.multiple(() => faker.helpers.arrayElement(tags), { count: 5 }),
      assignee: faker.helpers.arrayElement(persons),
    };
    todoSamples.push(new TodoEntity(newTodo));
  }

  return todoPort.saveAll(todoSamples);
};
