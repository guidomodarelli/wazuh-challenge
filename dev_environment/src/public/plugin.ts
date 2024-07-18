import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { PLUGIN_NAME } from '../common';
import { TodoAdapterOpenSearchHTTP } from './core/adapters/TodoAdapterOpenSearchHTTP';
import { addSampleTodosUseCase } from './core/domain/useCases/AddSampleTodosUseCase';
import { countTodosCompletedUseCase } from './core/domain/useCases/CountTodosCompletedUseCase';
import { createTodoUseCase } from './core/domain/useCases/CreateTodoUseCase';
import { deleteTodoByIdsUseCase } from './core/domain/useCases/DeleteTodoByIdsUseCase';
import { getAllTodosUseCase } from './core/domain/useCases/GetAllTodosUseCase';
import { markTodoAsCompletedUseCase } from './core/domain/useCases/MarkTodoAsCompletedUseCase';
import { searchTodoUseCase } from './core/domain/useCases/SearchTodoUseCase';
import { updateTodoUseCase } from './core/domain/useCases/UpdateTodoUseCase';
import { ToDoPluginSetup, ToDoPluginStart, ToDoPluginUseCases } from './types';

export class ToDoPlugin implements Plugin<ToDoPluginSetup, ToDoPluginStart> {
  public setup(core: CoreSetup): ToDoPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'todoPlugin',
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart] = await core.getStartServices();
        const todoPort = new TodoAdapterOpenSearchHTTP(coreStart);

        const useCases: ToDoPluginUseCases = {
          createTodo: createTodoUseCase(todoPort),
          getAllTodos: getAllTodosUseCase(todoPort),
          updateTodo: updateTodoUseCase(todoPort),
          deleteTodosByIds: deleteTodoByIdsUseCase(todoPort),
          markTodoAsCompleted: markTodoAsCompletedUseCase(todoPort),
          addSampleTodos: addSampleTodosUseCase(todoPort),
          searchTodos: searchTodoUseCase(),
          countTodosCompleted: countTodosCompletedUseCase(),
        };

        // Render the application
        return renderApp(coreStart, useCases, params);
      },
    });

    // Return methods that should be available to other plugins
    return {};
  }

  public start(core: CoreStart): ToDoPluginStart {
    return {};
  }

  public stop() {}
}
