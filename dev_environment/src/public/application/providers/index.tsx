import { I18nProvider } from '@osd/i18n/react';
import React, { PropsWithChildren } from 'react';
import ToDoProvider from '../context/TodoContext';

interface ProvidersProps {}

const Providers = ({ children }: PropsWithChildren<ProvidersProps>) => {
  return (
    <I18nProvider>
      <ToDoProvider>{children}</ToDoProvider>
    </I18nProvider>
  );
};

export default Providers;
