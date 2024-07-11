import { PluginInitializerContext } from '../../../src/core/server';
import { ToDoPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new ToDoPlugin(initializerContext);
}

export { ToDoPluginSetup, ToDoPluginStart } from './types';
