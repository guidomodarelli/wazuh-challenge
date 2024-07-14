import {
  EuiButton,
  EuiButtonIcon,
  EuiCheckbox,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexItem,
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
import React, { ReactNode, useState, useContext } from 'react';
import { Priority, Status, TodoItem } from '../../common/types';
import TodoPriority from '../components/TodoBadges/TodoBadgePriority';
import TodoStatus from '../components/TodoBadges/TodoBadgeStatus';
import { TodoContext } from '../context/todo.context';

interface Column<T> {
  field: string;
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

const useTodoTable = () => {
  const { todoItems, removeTodo } = useContext(TodoContext);
  const [itemIdToSelectedMap, setItemIdToSelectedMap] = useState<State['itemIdToSelectedMap']>({});
  const [itemIdToOpenActionsPopoverMap, setItemIdToOpenActionsPopoverMap] = useState<
    State['itemIdToOpenActionsPopoverMap']
  >({});

  const columns: Column<TodoItem>[] = [
    {
      field: 'checkbox',
      isCheckbox: true,
      textOnly: false,
      width: '32px',
    },
    {
      field: 'title',
      label: 'Title',
      'data-test-subj': 'titleCell',
      render: (value: TodoItem['title']) => <EuiText>{value}</EuiText>,
    },
    {
      field: 'status',
      label: 'Status',
      'data-test-subj': 'statusCell',
      render: (value: Status) => <TodoStatus variant={value} />,
    },
    {
      field: 'priority',
      label: 'Priority',
      'data-test-subj': 'priorityCell',
      render: (value: Priority) => <TodoPriority variant={value} />,
    },
    {
      field: 'plannedDate',
      label: 'Planned at',
      'data-test-subj': 'plannedDateCell',
      render: (value: TodoItem['plannedDate']) => <EuiText>{value}</EuiText>,
    },
    {
      field: 'startedAt',
      label: 'Started at',
      'data-test-subj': 'startedAtCell',
      render: (value: TodoItem['startedAt']) => <EuiText>{value}</EuiText>,
    },
    {
      field: 'completedAt',
      label: 'Completed at',
      'data-test-subj': 'completedAtCell',
      render: (value: TodoItem['completedAt']) => <EuiText>{value}</EuiText>,
    },
    {
      field: 'createdAt',
      label: 'Created at',
      'data-test-subj': 'createdAtCell',
      render: (value: TodoItem['createdAt']) =>
        value ? <EuiText>{new Date(value).toLocaleDateString()}</EuiText> : <></>,
    },
    {
      field: 'actions',
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
   * The `toggleAll` function toggles the selection status of all todo items.
   */
  const toggleAll = () => {
    const allSelected = areAllItemsSelected();
    const newItemIdToSelectedMap: State['itemIdToSelectedMap'] = {};
    todoItems.forEach((item) => (newItemIdToSelectedMap[item.id] = !allSelected));

    setItemIdToSelectedMap(newItemIdToSelectedMap);
  };

  /**
   * The `renderSelectAll` function returns a checkbox component for selecting all rows.
   * @returns an `EuiCheckbox` component.
   */
  const renderSelectAll = () => {
    return (
      <EuiCheckbox
        id={'selectAllCheckboxDesktop'}
        aria-label="Select all rows"
        title="Select all rows"
        checked={areAllItemsSelected()}
        onChange={toggleAll.bind(this)}
      />
    );
  };

  const renderHeaderCells = () => {
    const headers: ReactNode[] = [];

    columns.forEach((column, columnIndex) => {
      if (column.isCheckbox) {
        headers.push(
          <EuiTableHeaderCellCheckbox key={column.field} width={column.width}>
            {renderSelectAll()}
          </EuiTableHeaderCellCheckbox>
        );
      } else if (column.isVisuallyHiddenLabel) {
        headers.push(
          <EuiTableHeaderCell key={column.field} width={column.width}>
            <EuiScreenReaderOnly>
              <span>{column.label}</span>
            </EuiScreenReaderOnly>
          </EuiTableHeaderCell>
        );
      } else {
        headers.push(
          <EuiTableHeaderCell
            key={column.field}
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
        const cell = item[column.field as keyof TodoItem];

        let child;

        if (column.isCheckbox) {
          return (
            <EuiTableRowCellCheckbox key={column.field}>
              <EuiCheckbox
                id={`${item.id}-checkbox`}
                checked={isItemSelected(item.id)}
                onChange={toggleItem.bind(this, item.id)}
                title="Select this row"
                aria-label="Select this row"
              />
            </EuiTableRowCellCheckbox>
          );
        }

        if (column.isActionsPopover) {
          return (
            <EuiTableRowCell key={column.field} textOnly={false} hasActions={true} align="right">
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
                        closePopover(item.id);
                      }}
                    >
                      Edit
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="B"
                      icon="copy"
                      onClick={() => {
                        closePopover(item.id);
                      }}
                    >
                      Duplicate
                    </EuiContextMenuItem>,
                    <EuiContextMenuItem
                      key="C"
                      icon="trash"
                      onClick={() => {
                        removeTodo(item.id);
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
            key={column.field}
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

  let optionalActionButtons;
  if (!!areAnyRowsSelected()) {
    optionalActionButtons = (
      <EuiFlexItem grow={false}>
        <EuiButton color="danger">Delete selected</EuiButton>
      </EuiFlexItem>
    );
  }

  return {
    columns,
    renderRows,
    renderHeaderCells,
    optionalActionButtons,
  };
};

export default useTodoTable;
