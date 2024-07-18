import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { ToDoPluginSetup, ToDoPluginStart } from './types';
import { PLUGIN_NAME } from '../common';
import { getServices } from './services';
import { TodoAdapterOpenSearchHTTP } from './core/adapters/TodoAdapterOpenSearchHTTP';
import { CreateTodoUseCase } from './core/domain/usecases/CreateTodo';
import { GetAllTodosUseCase } from './core/domain/usecases/GetAllTodos';
import { UpdateTodoUseCase } from './core/domain/usecases/UpdateTodo';
import { DeleteTodoByIdsUseCase } from './core/domain/usecases/DeleteTodoByIds';
import { MarkTodoAsCompletedUseCase } from './core/domain/usecases/MarkTodoAsCompleted';
import { addSampleTodosUseCase } from './core/domain/usecases/AddSampleTodos';

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
        const startServices = getServices(coreStart);
        const todoPort = new TodoAdapterOpenSearchHTTP(coreStart);

        const useCases = {
          createTodo: new CreateTodoUseCase(todoPort),
          getAllTodos: new GetAllTodosUseCase(todoPort),
          updateTodo: new UpdateTodoUseCase(todoPort),
          deleteTodosByIds: new DeleteTodoByIdsUseCase(todoPort),
          markTodoAsCompleted: new MarkTodoAsCompletedUseCase(todoPort),
          addSampleTodos: addSampleTodosUseCase(todoPort),
        };

        // Render the application
        return renderApp(
          coreStart,
          startServices,
          useCases,
          params
        );
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
