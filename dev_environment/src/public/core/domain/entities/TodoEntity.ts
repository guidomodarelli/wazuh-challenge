import { v4 as UUID } from 'uuid';
import { Priority } from './Priority';
import { Status } from './Status';

export type TodoEntityId = string;
export type TodoEntityRequest = Omit<TodoEntity, 'id' | 'createdAt'>;

export class TodoEntity {
  id: TodoEntityId;
  title: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  tags?: string[] | undefined;
  assignee?: string | undefined;

  constructor(data: TodoEntityRequest) {
    this.id = UUID();
    this.title = data.title;
    this.status = data.status;
    this.priority = data.priority;
    this.createdAt = new Date().toISOString();
    this.tags = data.tags ?? [];
    this.assignee = data.assignee;
  }
}
