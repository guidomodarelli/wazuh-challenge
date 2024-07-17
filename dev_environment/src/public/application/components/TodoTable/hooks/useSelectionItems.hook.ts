import { EuiTableSelectionType } from '@elastic/eui';
import { useState } from 'react';
import { TodoItem } from '../../../../../common/types';

interface UseSelectionItemsProps {
  deleteTodosByIds: (...ids: string[]) => void;
}

function useSelectionItems({ deleteTodosByIds }: UseSelectionItemsProps) {
  const [selectedItems, setSelectedItems] = useState<TodoItem['id'][]>([]);

  const selection: EuiTableSelectionType<TodoItem> = {
    selectableMessage: (selectable: boolean, todoItem: TodoItem) =>
      !selectable ? `${todoItem.title} is completed` : `Select ${todoItem.title}`,
    onSelectionChange: (selectedItems: TodoItem[]) => {
      setSelectedItems(selectedItems.map((todoItem) => todoItem.id));
    },
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
