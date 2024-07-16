import { EuiTableSelectionType } from '@elastic/eui';
import { TodoItem } from '../../../common/types';
import { useState } from 'react';
import { useTodoContext } from '../../context/TodoContext';

function useSelectionItems() {
  const { deleteTodosByIds } = useTodoContext();
  const [selectedItems, setSelectedItems] = useState<TodoItem['id'][]>([]);

  /**
   * The function `onSelectionChange` takes an array of `TodoItem` objects, extracts their `id` properties, and sets
   * them as the selected items.
   * @param {TodoItem[]} selectedItems - The `selectedItems` parameter is an array of `TodoItem['id']` strings.
   */
  const onSelectionChange = (selectedItems: TodoItem[]) => {
    setSelectedItems(selectedItems.map((todoItem) => todoItem.id));
  };

  /* The `selection` constant is defining an object of type `EuiTableSelectionType<TodoItem>`. */
  const selection: EuiTableSelectionType<TodoItem> = {
    selectableMessage: (selectable: boolean, todoItem: TodoItem) =>
      !selectable ? `${todoItem.title} is completed` : `Select ${todoItem.title}`,
    onSelectionChange,
  };

  const deleteSelectedItems = () => {
    deleteTodosByIds(...selectedItems);
    setSelectedItems([]);
  };

  return {
    selectedItems,
    setSelectedItems,
    selection,
    deleteSelectedItems
  };
}

export default useSelectionItems;
