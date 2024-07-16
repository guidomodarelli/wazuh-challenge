import { EuiPage, EuiPageBody, EuiPageContent, EuiPageContentBody, EuiPageHeader, EuiTitle } from "@elastic/eui";
import { FormattedMessage } from '@osd/i18n/react';
import React from 'react';
import { PLUGIN_NAME } from "../../common";
import Charts from "../components/Charts/Charts";

interface ChartsProps {}

const ChartsPage = ({}: ChartsProps) => {
  return (
    <EuiPage restrictWidth="1280px">
      <EuiPageBody component="main">
        <EuiPageHeader>
          <EuiTitle size="l">
            <h1>
              <FormattedMessage
                id="todoPlugin.ToDoTitle"
                defaultMessage="{name}"
                values={{ name: PLUGIN_NAME }}
              />
            </h1>
          </EuiTitle>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody>
            <Charts />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default ChartsPage;
