import { EuiTableSelectionType } from '@elastic/eui';
import { TodoItem } from '../../../../../common/types';
import { useState } from 'react';
import { useTodoContext } from '../../../context/TodoContext';

function useSelectionItems() {
  const { deleteTodosByIds } = useTodoContext();
  const [selectedItems, setSelectedItems] = useState<TodoItem['id'][]>([]);

  /**
   * The function `onSelectionChange` takes an array of `TodoItem` objects, extracts their `id` properties, and sets
   * them as the selected items.
   * @param {TodoItem[]} selectedItems - an array of `TodoItem['id']` strings.
   */
  const onSelectionChange = (selectedItems: TodoItem[]) => {
    setSelectedItems(selectedItems.map((todoItem) => todoItem.id));
  };

  const selection: EuiTableSelectionType<TodoItem> = {
    selectableMessage: (selectable: boolean, todoItem: TodoItem) =>
      !selectable ? `${todoItem.title} is completed` : `Select ${todoItem.title}`,
    onSelectionChange,
  };

  /**
   * The function `deleteSelectedItems` deletes todos by their IDs and clears the selected items array.
   */
  const deleteSelectedItems = () => {
    deleteTodosByIds(...selectedItems);
    setSelectedItems([]);
  };

  return {
    selectedItems,
    setSelectedItems,
    selection,
    deleteSelectedItems,
  };
}

export default useSelectionItems;
