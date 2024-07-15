import {
  Comparators,
  Criteria,
  Direction,
  EuiBadge,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSpacer,
  EuiTableSelectionType,
  EuiTableSortingType,
  EuiText,
} from '@elastic/eui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TodoItem } from '../../../common/types';
import { useTodoContext } from '../../context/todo.context';
import TodoBadgePriority from '../TodoBadges/TodoBadgePriority';
import TodoBadgeStatus from '../TodoBadges/TodoBadgeStatus';
import FlyoutForm from '../TodoForm/FlyoutForm';
import { FieldValues } from '../TodoForm/schema';
import './TodoTable.styles.scss';

const pageSizeOptions = [10, 25, 50];

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
  const history = useHistory();

  const columns: Array<EuiBasicTableColumn<TodoItem>> = [
    {
      field: 'title',
      name: 'Title',
      sortable: true,
    },
    {
      id: 'tags',
      name: 'Tags',
      'data-test-subj': 'tagsCell',
      render: ({ tags }: TodoItem) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {tags?.map((tag, index) => (
            <EuiBadge key={`${tag}-${index}`} color="default">
              {tag}
            </EuiBadge>
          ))}
        </div>
      ),
    },
    {
      id: 'assignee',
      name: 'Assignee',
      render: ({ assignee }: TodoItem) => <EuiText>{assignee}</EuiText>,
    },
    {
      id: 'status',
      name: 'Status',
      'data-test-subj': 'statusCell',
      render: ({ status }: TodoItem) => <TodoBadgeStatus variant={status} />,
    },
    {
      id: 'priority',
      name: 'Priority',
      'data-test-subj': 'priorityCell',
      render: ({ priority }: TodoItem) => <TodoBadgePriority variant={priority} />,
    },
    {
      id: 'isCompleted',
      name: 'Is completed',
      'data-test-subj': 'isCompletedCell',
      render: ({ isCompleted }: TodoItem) => (isCompleted ? <EuiIcon type="check" /> : <></>),
    },
    {
      id: 'createdAt',
      name: 'Created at',
      'data-test-subj': 'createdAtCell',
      render: ({ createdAt }: TodoItem) =>
        createdAt ? <EuiText>{new Date(createdAt).toLocaleDateString()}</EuiText> : <></>,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Edit',
          description: 'Delete this Todo item',
          icon: 'pencil',
          type: 'icon',
          onClick: (todoItem: TodoItem) => {
            setItemIdToUpdate(todoItem.id);
            openFlyout();
            setSelectedItems([]);
          },
        },
        {
          name: 'Delete',
          description: 'Delete this Todo item',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: (todoItem: TodoItem) => {
            removeTodo(todoItem.id);
            setSelectedItems([]);
          },
        },
      ],
    },
  ];

  /**
   * Selection
   */
  const [selectedItems, setSelectedItems] = useState<TodoItem['id'][]>([]);

  const onSelectionChange = (selectedItems: TodoItem[]) => {
    setSelectedItems(selectedItems.map((todoItem) => todoItem.id));
  };

  const selection: EuiTableSelectionType<TodoItem> = {
    selectableMessage: (selectable: boolean, todoItem: TodoItem) =>
      !selectable ? `${todoItem.title} is completed` : `Select ${todoItem.title}`,
    onSelectionChange,
  };

  /**
   * Pagination & sorting
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [sortField, setSortField] = useState<keyof TodoItem>('title');
  const [sortDirection, setSortDirection] = useState<Direction>('asc');

  const onTableChange = ({ page, sort }: Criteria<TodoItem>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  // Manually handle sorting and pagination of data
  const findTodos = (
    todoItems: TodoItem[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof TodoItem,
    sortDirection: Direction
  ) => {
    let items;

    if (sortField) {
      items = todoItems
        .slice(0)
        .sort(Comparators.property(sortField, Comparators.default(sortDirection)));
    } else {
      items = todoItems;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(startIndex, Math.min(startIndex + pageSize, todoItems.length));
    }

    return {
      pageOfItems,
      totalItemCount: todoItems.length,
    };
  };

  const { pageOfItems, totalItemCount } = findTodos(
    todoItems,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [10, 25, 50],
  };

  const sorting: EuiTableSortingType<TodoItem> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

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
