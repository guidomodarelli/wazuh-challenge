import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoItem } from '../../../common/types';
import { useTodoContext } from '../../context/TodoContext';
import FlyoutForm from '../TodoForm/FlyoutForm';
import { FieldValues } from '../TodoForm/schema';
import './TodoTable.styles.scss';
import useColumns from './useColumns.hook';
import useSelectionItems from './useSelectionItems.hook';
import useSortingAndPagination from './useSortingAndPagination.hook';

const Todos = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [itemIdToUpdate, setItemIdToUpdate] = useState<string | undefined>(undefined);
  const {
    todoItems,
    filteredTodoItems,
    completedTodos,
    search,
    setSearch,
    addSampleData,
    deleteTodosByIds,
  } = useTodoContext();
  const { selectedItems, setSelectedItems, selection } = useSelectionItems();
  const { columns } = useColumns({
    onActionEdit(todoItem) {
      setItemIdToUpdate(todoItem.id);
      openFlyout();
      setSelectedItems([]);
    },
    onActionDelete(todoItem) {
      deleteTodosByIds(todoItem.id);
      setSelectedItems([]);
    },
  });
  const { onTableChange, pageOfItems, pagination, sorting, resultsCount } = useSortingAndPagination<
    TodoItem
  >({
    items: filteredTodoItems,
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

  const mapToFieldValues = (itemToUpdate: TodoItem): Partial<FieldValues> => {
    return {
      ...itemToUpdate,
      status: [itemToUpdate.status],
      priority: [itemToUpdate.priority],
    };
  };

  let flyout;
  const setFlyout = (itemToUpdate: TodoItem) => {
    flyout = (
      <FlyoutForm
        itemIdToUpdate={itemIdToUpdate}
        defaultValues={mapToFieldValues(itemToUpdate)}
        onClose={closeFlyout}
      />
    );
  };
  if (isFlyoutVisible) {
    const itemToUpdate = filteredTodoItems.find((item) => item.id === itemIdToUpdate);
    if (itemToUpdate) setFlyout(itemToUpdate);
  }

  const clickChartsHandler = () => {
    history.push('/charts');
  };

  const changeSearchTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const deleteSelectedItemsHandler = () => {
    deleteTodosByIds(...selectedItems);
    setSelectedItems([]);
  };

  /* If there are rows selected, it will display a "Delete selected items" button with a danger color. The button's
onClick event handler will call the `deleteTodosByIds` function with the IDs of all selected items. */
  let optionalActionButtons;
  if (selectedItems.length > 0) {
    optionalActionButtons = (
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" iconType="trash" onClick={deleteSelectedItemsHandler}>
          Delete {selectedItems.length} Users
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
          <EuiButton onClick={() => addSampleData()}>Add sample data</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={clickChartsHandler}>Charts</EuiButton>
        </EuiFlexItem>
        {optionalActionButtons}
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFieldSearch
        placeholder="Search Todo items"
        value={search}
        onChange={changeSearchTodoHandler}
        isClearable
      />
      <EuiSpacer size="m" />
      <EuiText size="xs">
        <strong>{completedTodos}</strong> out of <strong>{todoItems.length}</strong> todos completed
      </EuiText>
      <EuiText size="xs">Showing {resultsCount} todos</EuiText>
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
