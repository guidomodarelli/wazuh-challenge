import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CoreStart } from '../../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../../src/plugins/navigation/public';
import ChartsPage from '../pages/ChartsPage';
import MainPage from '../pages/MainPage';
import Providers from '../providers';
import { Services } from '../../services';

interface ToDoPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  services: Services;
}

export const ToDoPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
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
