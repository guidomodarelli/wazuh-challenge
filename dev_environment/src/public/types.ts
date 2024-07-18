import { NotificationsStart } from 'opensearch-dashboards/public';
import { AddSampleTodosUseCase } from './core/domain/usecases/AddSampleTodos';
import { CreateTodoUseCase } from './core/domain/usecases/CreateTodo';
import { DeleteTodoByIdsUseCase } from './core/domain/usecases/DeleteTodoByIds';
import { GetAllTodosUseCase } from './core/domain/usecases/GetAllTodos';
import { MarkTodoAsCompletedUseCase } from './core/domain/usecases/MarkTodoAsCompleted';
import { UpdateTodoUseCase } from './core/domain/usecases/UpdateTodo';
import { SearchTodoUseCase } from './core/domain/usecases/SearchTodoUseCase';
import { CountTodosCompletedUseCase } from './core/domain/usecases/CountTodosCompletedUseCase';

export interface ToDoPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDoPluginStart {}

export interface ToDoPluginUseCases {
  createTodo: CreateTodoUseCase;
  getAllTodos: GetAllTodosUseCase;
  updateTodo: UpdateTodoUseCase;
  deleteTodosByIds: DeleteTodoByIdsUseCase;
  markTodoAsCompleted: MarkTodoAsCompletedUseCase;
  addSampleTodos: AddSampleTodosUseCase;
  searchTodos: SearchTodoUseCase;
  countTodosCompleted: CountTodosCompletedUseCase;
}

export interface ToDoPluginServices extends ToDoPluginUseCases {
  notifications: NotificationsStart;
}

export interface AppPluginStartDependencies {}
