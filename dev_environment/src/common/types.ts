import { OmitStrict } from "./global-types";

export enum Status {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'Working on it',
  DONE = 'Successfully executed',
  EXECUTED_WITH_ERROR = 'Executed with error',
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
  isCompleted: boolean;
}

export type TodoItemRequest = OmitStrict<TodoItem, 'id' | 'createdAt'>;
