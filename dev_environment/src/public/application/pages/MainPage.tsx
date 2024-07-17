import React from 'react';
import TodoTable from '../components/TodoTable/TodoTable';
import Layout from '../layouts/Layout';

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <Layout>
      <TodoTable />
    </Layout>
  );
};

export default MainPage;
