import { EuiTableSelectionType } from '@elastic/eui';
import { TodoItem } from '../../../common/types';
import { useState } from 'react';

function useSelectionItems() {
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

  return {
    selectedItems,
    setSelectedItems,
    selection,
  };
}

export default useSelectionItems;
