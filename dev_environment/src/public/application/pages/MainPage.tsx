import React from 'react';
import TodoTable from '../components/TodoTable/TodoTable';
import Layout from '../layouts/Layout';
import { FormattedMessage } from '@osd/i18n/react';
import { PLUGIN_NAME } from '../../../common';

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <Layout
      title={
        <FormattedMessage
          id="todoPlugin.ToDoTitle"
          defaultMessage="{name}"
          values={{ name: PLUGIN_NAME }}
        />
      }
    >
      <TodoTable />
    </Layout>
  );
};

export default MainPage;
