import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';

interface MainPageProps {
  title: React.ReactNode;
}

const Layout = ({ children, title }: React.PropsWithChildren<MainPageProps>) => {
  return (
    <EuiPage restrictWidth="1280px">
      <EuiPageBody component="main">
        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>{title}</h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody>{children}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Layout;
