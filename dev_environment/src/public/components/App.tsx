import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';
import Providers from '../providers';
import { Services } from '../services';
import MainPage from "../pages/MainPage";

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
        <MainPage />
      </Providers>
    </BrowserRouter>
  );
};
