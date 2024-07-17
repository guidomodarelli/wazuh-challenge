import React from 'react';
import Charts from '../components/Charts/Charts';
import Layout from '../layouts/Layout';

interface ChartsPageProps {}

const ChartsPage = ({}: ChartsPageProps) => {
  return (
    <Layout>
      <Charts />
    </Layout>
  );
};

export default ChartsPage;
