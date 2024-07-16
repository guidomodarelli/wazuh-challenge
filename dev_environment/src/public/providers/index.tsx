import { I18nProvider } from '@osd/i18n/react';
import ToDoProvider from '../context/TodoContext';
import React, { PropsWithChildren } from 'react';
import { CoreStart } from "opensearch-dashboards/public";
import { Services } from "../services";

interface ProvidersProps {
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  services: Services;
}

const Providers = ({ children, notifications, services }: PropsWithChildren<ProvidersProps>) => {
  return (
    <I18nProvider>
      <ToDoProvider notifications={notifications} services={services}>
        {children}
      </ToDoProvider>
    </I18nProvider>
  );
};

export default Providers;
