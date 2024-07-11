import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import {
  ToDoPluginSetup,
  ToDoPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

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
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
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
