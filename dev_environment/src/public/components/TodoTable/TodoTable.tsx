import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
} from '@elastic/eui';
import React, { useState } from 'react';
import { TodoContext } from '../../context/todo.context';
import useTodoTable from '../../hooks/useTodoTable';
import FlyoutForm from '../TodoForm/FlyoutForm';
import './TodoTable.styles.scss';
import { FieldValues } from '../TodoForm/schema';

const Todos = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState<string | undefined>(undefined);
  const { todoItems } = React.useContext(TodoContext);
  const { renderRows, renderHeaderCells, optionalActionButtons } = useTodoTable({
    onEdit(todoItemId) {
      setItemIdToUpdate(todoItemId);
      openFlyout();
    },
  });

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
      dueDate: itemToUpdate?.dueDate ? new Date(itemToUpdate?.dueDate) : undefined,
      plannedDate: itemToUpdate?.plannedDate ? new Date(itemToUpdate?.plannedDate) : undefined,
      startedDate: itemToUpdate?.startedDate ? new Date(itemToUpdate?.startedDate) : undefined,
      completedDate: itemToUpdate?.completedDate
        ? new Date(itemToUpdate?.completedDate)
        : undefined,
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
        {optionalActionButtons}
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiTable>
        <EuiTableHeader>{renderHeaderCells()}</EuiTableHeader>
        <EuiTableBody>{renderRows()}</EuiTableBody>
      </EuiTable>
    </>
  );
};

export default Todos;
