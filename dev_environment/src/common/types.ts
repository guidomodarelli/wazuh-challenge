export type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum Status {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'Working on it',
  COMPLETED = 'Completed',
  EXECUTED_WITH_ERROR = 'Error',
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface TodoItem {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  tags?: string[];
  assignee?: string;
}

export type TodoItemRequest = OmitStrict<TodoItem, 'id' | 'createdAt'>;
