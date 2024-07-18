import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { AddSampleTodosUseCase } from "./core/domain/usecases/AddSampleTodos";
import { CreateTodoUseCase } from './core/domain/usecases/CreateTodo';
import { DeleteTodoByIdsUseCase } from "./core/domain/usecases/DeleteTodoByIds";
import { GetAllTodosUseCase } from './core/domain/usecases/GetAllTodos';
import { MarkTodoAsCompletedUseCase } from "./core/domain/usecases/MarkTodoAsCompleted";
import { UpdateTodoUseCase } from "./core/domain/usecases/UpdateTodo";

export interface ToDoPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDoPluginStart {
  createTodo: CreateTodoUseCase;
  getAllTodos: GetAllTodosUseCase;
  updateTodo: UpdateTodoUseCase;
  deleteTodosByIds: DeleteTodoByIdsUseCase;
  markTodoAsCompleted: MarkTodoAsCompletedUseCase;
  addSampleTodos: AddSampleTodosUseCase;
}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
