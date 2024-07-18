import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../../src/core/public';
import { Services } from '../services';
import { ToDoPluginApp } from './components/App';

export const renderApp = (
  { notifications, http }: CoreStart,
  services: Services,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <ToDoPluginApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      services={services}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
