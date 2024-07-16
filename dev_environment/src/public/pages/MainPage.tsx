import React from 'react';
import Todos from '../components/TodoTable/TodoTable';
import Layout from '../layouts/Layout';

interface MainPageProps {}

const MainPage = ({}: MainPageProps) => {
  return (
    <Layout>
      <Todos />
    </Layout>
  );
};

export default MainPage;
