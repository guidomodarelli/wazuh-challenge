import {
  EuiBadge,
  EuiButton,
  EuiButtonIcon,
  EuiCheckbox,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexItem,
  EuiIcon,
  EuiPopover,
  EuiScreenReaderOnly,
  EuiTableHeaderCell,
  EuiTableHeaderCellCheckbox,
  EuiTableRow,
  EuiTableRowCell,
  EuiTableRowCellCheckbox,
  EuiText,
  HorizontalAlignment,
  RIGHT_ALIGNMENT,
} from '@elastic/eui';
import React, { ReactNode, useState } from 'react';
import { Priority, Status, TodoItem } from '../../common/types';
import TodoBadgePriority from '../components/TodoBadges/TodoBadgePriority';
import TodoBadgeStatus from '../components/TodoBadges/TodoBadgeStatus';
import { useTodoContext } from '../context/todo.context';

interface Column<T> {
  id: string;
  label?: string;
  isVisuallyHiddenLabel?: boolean;
  isSortable?: boolean;
  isCheckbox?: boolean;
  isActionsPopover?: boolean;
  textOnly?: boolean;
  alignment?: HorizontalAlignment;
  width?: string;
  footer?: ReactNode | Function;
  render?: (value: any, record: T) => ReactNode;
  'data-test-subj'?: string;
}

interface State {
  itemIdToSelectedMap: Record<React.Key, boolean>;
  itemIdToEditableMap: Record<React.Key, boolean>;
  itemIdToOpenActionsPopoverMap: Record<React.Key, boolean>;
  sortedColumn: keyof TodoItem;
  itemsPerPage: number;
  firstItemIndex: number;
  lastItemIndex: number;
}

interface UseTodoTableProps {
  onEdit: (todoItemId: string) => void;
}

function useTodoTable({ onEdit }: UseTodoTableProps) {
  const { filteredTodoItems: todoItems, removeTodo, deleteTodosByIds } = useTodoContext();
  const [itemIdToSelectedMap, setItemIdToSelectedMap] = useState<State['itemIdToSelectedMap']>({});
  const [itemIdToOpenActionsPopoverMap, setItemIdToOpenActionsPopoverMap] = useState<
    State['itemIdToOpenActionsPopoverMap']
  >({});

  const columns: Column<TodoItem>[] = [
    {
      id: 'checkbox',
      isCheckbox: true,
      textOnly: false,
      width: '32px',
    },
    {
      id: 'title',
      label: 'Title',
      'data-test-subj': 'titleCell',
      render: (value: TodoItem['title']) => <EuiText>{value}</EuiText>,
    },
    {
      id: 'tags',
      label: 'Tags',
      'data-test-subj': 'tagsCell',
      render: (tags: TodoItem['tags']) => (
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
      label: 'Assignee',
      'data-test-subj': 'assigneeCell',
      render: (value: TodoItem['assignee']) => <EuiText>{value}</EuiText>,
    },
    {
      id: 'status',
      label: 'Status',
      'data-test-subj': 'statusCell',
      render: (value: Status) => <TodoBadgeStatus variant={value} />,
    },
    {
      id: 'priority',
      label: 'Priority',
      'data-test-subj': 'priorityCell',
      render: (value: Priority) => <TodoBadgePriority variant={value} />,
    },
    {
      id: 'isCompleted',
      label: 'Is completed',
      'data-test-subj': 'isCompletedCell',
      render: (value: TodoItem['isCompleted']) => (value ? <EuiIcon type="check" /> : <></>),
    },
    {
      id: 'createdAt',
      label: 'Created at',
      'data-test-subj': 'createdAtCell',
      render: (value: TodoItem['createdAt']) =>
        value ? <EuiText>{new Date(value).toLocaleDateString()}</EuiText> : <></>,
    },
    {
      id: 'actions',
      label: 'Actions',
      'data-test-subj': 'actionsCell',
      isVisuallyHiddenLabel: true,
      alignment: RIGHT_ALIGNMENT,
      isActionsPopover: true,
      width: '32px',
    },
  ];

  /**
   * The function `areAllItemsSelected` checks if all todo items are selected.
   * @returns If all items are selected, it will return `true`, otherwise it will return `false`.
   */
  const areAllItemsSelected = () => {
    const indexOfUnselectedItem = todoItems.findIndex((item) => !isItemSelected(item.id));
    return indexOfUnselectedItem === -1;
  };

  /**
   * The function `getAllItemsSelected` filters `todoItems` to return only the items that are selected based on the
   * `isItemSelected` function.
   * @returns an array of todo items that have been selected.
   */
  const getAllItemIdsSelected = () => {
    return todoItems.filter((item) => isItemSelected(item.id)).map((item) => item.id);
  };

  /**
   * The `toggleAll` function toggles the selection status of all todo items.
   */
  const toggleAll = () => {
    const allSelected = areAllItemsSelected();
    const newItemIdToSelectedMap: State['itemIdToSelectedMap'] = {};
    todoItems.forEach((item) => (newItemIdToSelectedMap[item.id] = !allSelected));

    setItemIdToSelectedMap(newItemIdToSelectedMap);
  };

  /**
   * The `renderSelectAllCheckbox` function returns a checkbox component for selecting all rows.
   * @returns an `EuiCheckbox` component.
   */
  const renderSelectAllCheckbox = () => {
    return (
      <EuiCheckbox
        id={'selectAllCheckboxDesktop'}
        aria-label="Select all rows"
        title="Select all rows"
        checked={areAllItemsSelected()}
        // @ts-expect-error
        onChange={toggleAll.bind(this)}
      />
    );
  };

  const renderHeaderCells = () => {
    const headers: ReactNode[] = [];

    columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <EuiTableHeaderCellCheckbox key={column.id} width={column.width}>
            {renderSelectAllCheckbox()}
          </EuiTableHeaderCellCheckbox>
        );
      } else if (column.isVisuallyHiddenLabel) {
        headers.push(
          <EuiTableHeaderCell key={column.id} width={column.width}>
            <EuiScreenReaderOnly>
              <span>{column.label}</span>
            </EuiScreenReaderOnly>
          </EuiTableHeaderCell>
        );
      } else {
        headers.push(
          <EuiTableHeaderCell
            key={column.id}
            align={columns[columnIndex].alignment}
            width={column.width}
          >
            {column.label}
          </EuiTableHeaderCell>
        );
      }
    });
    return headers.length ? headers : null;
  };

  /**
   * The function `areAnyRowsSelected` checks if any rows are selected based on the `itemIdToSelectedMap` object.
   * @returns a boolean value indicating whether any rows are selected.
   * It checks if there is at least one key in the `itemIdToSelectedMap` object for which the corresponding value is
   * `true`. If such a key exists, the function returns `true`, indicating that at least one row is selected. Otherwise,
   * it returns `false`.
   */
  const areAnyRowsSelected = () => {
    return (
      Object.keys(itemIdToSelectedMap).findIndex((id) => {
        return itemIdToSelectedMap[id];
      }) !== -1
    );
  };

  /**
   * The `isItemSelected` function checks if an item with a specific ID is selected based on a mapping of item IDs to
   * selection status.
   * @param {string} itemId - represents the unique identifier of an item.
   * @returns the value associated with the `itemId` key in the `itemIdToSelectedMap` object.
   */
  const isItemSelected = (itemId: string) => {
    return itemIdToSelectedMap[itemId];
  };

  /**
   * The `toggleItem` function toggles the selection state of an item identified by its ID in a map.
   * @param {string} itemId - represents the unique identifier of an item that you want to toggle the selection state
   * for.
   */
  const toggleItem = (itemId: string) => {
    setItemIdToSelectedMap((previousItemIdToSelectedMap) => {
      const newItemIdToSelectedMap = {
        ...previousItemIdToSelectedMap,
        [itemId]: !previousItemIdToSelectedMap[itemId],
      };
      return newItemIdToSelectedMap;
    });
  };

  /**
   * The function `unselectItem` updates the `itemIdToSelectedMap` by setting the value of a specific item to `false`.
   * @param {string} itemId - a string that represents the unique identifier of the item that needs to be unselected.
   */
  const deselectItem = (itemId: string) => {
    setItemIdToSelectedMap((previousItemIdToSelectedMap) => {
      const newItemIdToSelectedMap = {
        ...previousItemIdToSelectedMap,
        [itemId]: false,
      };
      return newItemIdToSelectedMap;
    });
  };

  /**
   * The `isPopoverOpen` function returns the value associated with the `itemId` key in the
   * `itemIdToOpenActionsPopoverMap` object.
   * @param {string} itemId - represents the unique identifier of an item.
   * @returns the value associated with the `itemId` key in the `itemIdToOpenActionsPopoverMap` object.
   */
  const isPopoverOpen = (itemId: string) => {
    return itemIdToOpenActionsPopoverMap[itemId];
  };

  /**
   * The `closePopover` function updates the state to close the popover for a specific item if it is currently open.
   * @param {string} itemId - represents the unique identifier of the item whose popover needs to be closed.
   */
  const closePopover = (itemId: string) => {
    // only update the state if this item's popover is open
    if (isPopoverOpen(itemId)) {
      setItemIdToOpenActionsPopoverMap((previousItemIdToOpenActionsPopoverMap) => {
        const newItemIdToOpenActionsPopoverMap = {
          ...previousItemIdToOpenActionsPopoverMap,
          [itemId]: false,
        };
        return newItemIdToOpenActionsPopoverMap;
      });
    }
  };

  /**
   * The `togglePopover` function toggles the visibility of a popover associated with a specific item ID in a React
   * component state.
   * @param {string} itemId - represents the unique identifier of an item for which the popover is being toggled.
   */
  const togglePopover = (itemId: string) => {
    setItemIdToOpenActionsPopoverMap((previousItemIdToOpenActionsPopoverMap) => {
      const newItemIdToOpenActionsPopoverMap = {
        ...previousItemIdToOpenActionsPopoverMap,
        [itemId]: !previousItemIdToOpenActionsPopoverMap[itemId],
      };
      return newItemIdToOpenActionsPopoverMap;
    });
  };

  const renderRows = () => {
    const renderRow = (item: TodoItem) => {
      const cells = columns.map((column) => {
        const cell = item[column.id as keyof TodoItem];

        let child;

        if (column.isCheckbox) {
          return (
            <EuiTableRowCellCheckbox key={column.id}>
              <EuiCheckbox
                id={`${item.id}-checkbox`}
                checked={isItemSelected(item.id)}
                // @ts-expect-error
                onChange={toggleItem.bind(this, item.id)}
                title="Select this row"
                aria-label="Select this row"
              />
            </EuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <EuiTableRowCell key={column.id} textOnly={false} hasActions={true} align="right">
              <EuiPopover
                id={`${item.id}-actions`}
                button={
                  <EuiButtonIcon
                    aria-label="Actions"
                    iconType="gear"
                    size="xs"
                    color="text"
                    onClick={() => togglePopover(item.id)}
                  />
                }
                isOpen={isPopoverOpen(item.id)}
                closePopover={() => closePopover(item.id)}
                panelPaddingSize="none"
                anchorPosition="leftCenter"
              >
                <EuiContextMenuPanel
                  items={[
                    <EuiContextMenuItem
                      key="A"
                      icon="pencil"
                      onClick={() => {
                        onEdit(item.id);
                        closePopover(item.id);
                      }}
                    >
                      Edit
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        removeTodo(item.id);
                        deselectItem(item.id);
                        closePopover(item.id);
                      }}
                    >
                      Delete
                    </EuiContextMenuItem>,
                  ]}
                />
              </EuiPopover>
            </EuiTableRowCell>
          );
        }

        if (column.render) {
          child = column.render(cell, item);
        } else {
          child = cell;
        }

        return (
          <EuiTableRowCell
            key={column.id}
            align={column.alignment}
            textOnly={column.textOnly || false}
          >
            {child}
          </EuiTableRowCell>
        );
      });

      return (
        <EuiTableRow key={item.id} isSelected={isItemSelected(item.id)} hasActions={true}>
          {cells}
        </EuiTableRow>
      );
    };

    const rows = [];

    for (const todoItem of todoItems) {
      rows.push(renderRow(todoItem));
    }

    return rows;
  };

  /* If there are rows selected, it will display a "Delete selected" button with a danger color. The button's
onClick event handler will call the `deleteTodosByIds` function with the IDs of all selected items. */
  let optionalActionButtons;
  if (!!areAnyRowsSelected()) {
    optionalActionButtons = (
      <EuiFlexItem grow={false}>
        <EuiButton
          onClick={() => {
            deleteTodosByIds(...getAllItemIdsSelected());
            setItemIdToSelectedMap({});
          }}
          color="danger"
        >
          Delete selected
        </EuiButton>
      </EuiFlexItem>
    );
  }

  return {
    columns,
    renderRows,
    renderHeaderCells,
    optionalActionButtons,
  };
}

export default useTodoTable;
