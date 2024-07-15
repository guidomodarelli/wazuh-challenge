import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoItem } from '../../../common/types';
import { useTodoContext } from '../../context/todo.context';
import FlyoutForm from '../TodoForm/FlyoutForm';
import { FieldValues } from '../TodoForm/schema';
import './TodoTable.styles.scss';
import useColumns from './useColumns.hook';
import useSelectedItems from './useSelectedItems.hook';
import useSortingAndPagination from './useSortingAndPagination';

const Todos = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState<string | undefined>(undefined);
  const {
    filteredTodoItems: todoItems,
    search,
    setSearch,
    addSampleData,
    deleteTodosByIds,
    removeTodo,
  } = useTodoContext();
  const { selectedItems, setSelectedItems, selection } = useSelectedItems();
  const { columns } = useColumns({
    onActionEdit(todoItem) {
      setItemIdToUpdate(todoItem.id);
      openFlyout();
      setSelectedItems([]);
    },
    onActionDelete(todoItem) {
      removeTodo(todoItem.id);
      setSelectedItems([]);
    },
  });
  const { onTableChange, pageOfItems, pagination, sorting } = useSortingAndPagination<TodoItem>({
    items: todoItems,
    defaultSortField: 'title',
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

  /* If there are rows selected, it will display a "Delete selected items" button with a danger color. The button's
onClick event handler will call the `deleteTodosByIds` function with the IDs of all selected items. */
  let optionalActionButtons;
  if (selectedItems.length) {
    optionalActionButtons = (
      <EuiFlexItem grow={false}>
        <EuiButton
          onClick={() => {
            deleteTodosByIds(...selectedItems);
            setSelectedItems([]);
          }}
          color="danger"
        >
          Delete selected items
        </EuiButton>
      </EuiFlexItem>
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
      <EuiBasicTable
        tableCaption="Demo for responsive EuiBasicTable with mobile options"
        items={pageOfItems}
        itemId="id"
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        selection={selection}
        onChange={onTableChange}
      />
    </>
  );
};

export default Todos;
