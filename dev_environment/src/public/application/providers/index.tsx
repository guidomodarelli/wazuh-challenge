import { I18nProvider } from '@osd/i18n/react';
import React, { PropsWithChildren } from 'react';
import { Services } from "../../services";
import ToDoProvider from '../context/TodoContext';

interface ProvidersProps {
  services: Services;
}

const Providers = ({ children, services }: PropsWithChildren<ProvidersProps>) => {
  return (
    <I18nProvider>
      <ToDoProvider services={services}>
        {children}
      </ToDoProvider>
    </I18nProvider>
  );
};

export default Providers;
