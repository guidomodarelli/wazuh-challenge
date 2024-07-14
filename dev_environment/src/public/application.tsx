import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types/plugin';
import { ToDoPluginApp } from './components/App';
import { Services } from './services';

export const renderApp = (
  { notifications, http }: CoreStart,
  services: Services,
  { navigation }: AppPluginStartDependencies,
  { history, element }: AppMountParameters
) => {
  ReactDOM.render(
    <ToDoPluginApp
      basename={history.location.pathname}
      notifications={notifications}
      http={http}
      navigation={navigation}
      services={services}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
