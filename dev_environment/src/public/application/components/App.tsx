import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Services } from '../../services';
import ChartsPage from '../pages/ChartsPage';
import MainPage from '../pages/MainPage';
import Providers from '../providers';

interface ToDoPluginAppDeps {
  basename: string;
  services: Services;
}

export const ToDoPluginApp = ({ basename, services }: ToDoPluginAppDeps) => {
  return (
    <BrowserRouter basename={basename}>
      <Providers services={services}>
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
