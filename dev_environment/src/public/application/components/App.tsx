import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CoreStart } from '../../../../../src/core/public';
import { Services } from '../../services';
import ChartsPage from '../pages/ChartsPage';
import MainPage from '../pages/MainPage';
import Providers from '../providers';

interface ToDoPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  services: Services;
}

export const ToDoPluginApp = ({
  basename,
  notifications,
  http,
  services,
}: ToDoPluginAppDeps) => {
  return (
    <BrowserRouter basename={basename}>
      <Providers notifications={notifications} http={http} services={services}>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/charts">
            <ChartsPage />
          </Route>
        </Switch>
      </Providers>
    </BrowserRouter>
  );
};
