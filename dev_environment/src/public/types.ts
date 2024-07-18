import { NotificationsStart } from 'opensearch-dashboards/public';
import { AddSampleTodosUseCase } from './core/domain/useCases/AddSampleTodosUseCase';
import { CreateTodoUseCase } from './core/domain/useCases/CreateTodoUseCase';
import { DeleteTodoByIdsUseCase } from './core/domain/useCases/DeleteTodoByIdsUseCase';
import { GetAllTodosUseCase } from './core/domain/useCases/GetAllTodosUseCase';
import { MarkTodoAsCompletedUseCase } from './core/domain/useCases/MarkTodoAsCompletedUseCase';
import { UpdateTodoUseCase } from './core/domain/useCases/UpdateTodoUseCase';
import { SearchTodoUseCase } from './core/domain/useCases/SearchTodoUseCase';
import { CountTodosCompletedUseCase } from './core/domain/useCases/CountTodosCompletedUseCase';

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
