import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChartsPage from '../pages/ChartsPage';
import MainPage from '../pages/MainPage';
import Providers from '../providers';
import withErrorBoundary from './ErrorBoundary';

interface ToDoPluginAppDeps {
  basename: string;
}

const ToDoPluginApp = ({ basename }: ToDoPluginAppDeps) => {
  return (
    <BrowserRouter basename={basename}>
      <Providers>
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

export default withErrorBoundary(ToDoPluginApp);
