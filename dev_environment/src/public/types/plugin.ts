import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

export interface ToDoPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDoPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
