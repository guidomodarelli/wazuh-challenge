import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../../src/core/public';
import { ToDoPluginApp } from './components/App';
import { OpenSearchDashboardsContextProvider } from '../../../../src/plugins/opensearch_dashboards_react/public';
import { ToDoPluginUseCases } from "../types";

export const renderApp = (
  { notifications, http }: CoreStart,
  useCases: ToDoPluginUseCases,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <OpenSearchDashboardsContextProvider services={{ ...useCases, http, notifications }}>
      <ToDoPluginApp
        basename={appBasePath}
      />
    </OpenSearchDashboardsContextProvider>,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
