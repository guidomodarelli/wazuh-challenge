import {
  EuiButton,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableHeader
} from '@elastic/eui';
import React, { useState } from 'react';
import useTodoTable from '../../hooks/useTodoTable';
import FlyoutForm from '../TodoForm/FlyoutForm';
import './TodoTable.styles.scss';

const Todos = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const { renderRows, renderHeaderCells } = useTodoTable();

  const openFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  let flyout;
  if (isFlyoutVisible) {
    flyout = <FlyoutForm onClose={closeFlyout} />;
  }

  return (
    <>
      <EuiButton iconSide="right" fill iconType="plus" onClick={openFlyout}>
        New
      </EuiButton>
      <EuiSpacer />
      {flyout}
      <EuiTable>
        <EuiTableHeader>{renderHeaderCells()}</EuiTableHeader>
        <EuiTableBody>{renderRows()}</EuiTableBody>
      </EuiTable>
    </>
  );
};

export default Todos;
