import './index.scss';

import { ToDoPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new ToDoPlugin();
}
export { ToDoPluginSetup, ToDoPluginStart } from './types';
