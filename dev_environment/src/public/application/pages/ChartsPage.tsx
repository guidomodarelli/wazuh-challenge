import { FormattedMessage } from '@osd/i18n/react';
import React from 'react';
import Charts from '../components/Charts/Charts';
import Layout from '../layouts/Layout';

interface ChartsPageProps {}

const ChartsPage = ({}: ChartsPageProps) => {
  return (
    <Layout title={<FormattedMessage id="todoPlugin.chartsTitle" defaultMessage="Charts" />}>
      <Charts />
    </Layout>
  );
};

export default ChartsPage;
