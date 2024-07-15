import {
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTodoContext } from '../../context/todo.context';
import useTodoTable from '../../hooks/useTodoTable';
import FlyoutForm from '../TodoForm/FlyoutForm';
import { FieldValues } from '../TodoForm/schema';
import './TodoTable.styles.scss';

const Todos = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState<string | undefined>(undefined);
  const { todoItems, search, setSearch, addSampleData } = useTodoContext();
  const { renderRows, renderHeaderCells, optionalActionButtons } = useTodoTable({
    onEdit(todoItemId) {
      setItemIdToUpdate(todoItemId);
      openFlyout();
    },
  });
  const history = useHistory();

  const openFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const closeFlyout = () => {
    setItemIdToUpdate(undefined);
    setIsFlyoutVisible(false);
  };

  let flyout;
  if (isFlyoutVisible) {
    const itemToUpdate = todoItems.find((item) => item.id === itemIdToUpdate);
    const fieldItemToUpdate: Partial<FieldValues> = {
      ...itemToUpdate,
      status: itemToUpdate?.status ? [itemToUpdate.status] : undefined,
      priority: itemToUpdate?.priority ? [itemToUpdate.priority] : undefined,
    };
    flyout = (
      <FlyoutForm
        itemIdToUpdate={itemIdToUpdate}
        defaultValues={fieldItemToUpdate}
        onClose={closeFlyout}
      />
    );
  }

  return (
    <>
      {flyout}
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiButton iconSide="right" fill iconType="plus" onClick={openFlyout}>
            New
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={addSampleData}>Add sample data</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={() => history.push('/charts')}>Charts</EuiButton>
        </EuiFlexItem>
        {optionalActionButtons}
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFieldSearch
        placeholder="Search TODO items by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        isClearable
      />
      <EuiSpacer size="m" />
      <EuiTable>
        <EuiTableHeader>{renderHeaderCells()}</EuiTableHeader>
        <EuiTableBody>{renderRows()}</EuiTableBody>
      </EuiTable>
    </>
  );
};

export default Todos;
