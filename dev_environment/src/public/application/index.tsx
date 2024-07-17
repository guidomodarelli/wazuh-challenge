import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../../src/core/public';
import { AppPluginStartDependencies } from '../types';
import { ToDoPluginApp } from './components/App';
import { Services } from '../services';

export const renderApp = (
  { notifications, http }: CoreStart,
  services: Services,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <ToDoPluginApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      services={services}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
