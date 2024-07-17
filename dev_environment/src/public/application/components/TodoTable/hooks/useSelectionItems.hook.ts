import { EuiTableSelectionType } from '@elastic/eui';
import { TodoEntity, TodoEntityId } from '../../../../core/domain/entities/TodoEntity';
import { useState } from 'react';

interface UseSelectionItemsProps {
  deleteTodosByIds: (...ids: string[]) => void;
}

function useSelectionItems({ deleteTodosByIds }: UseSelectionItemsProps) {
  const [selectedItems, setSelectedItems] = useState<TodoEntityId[]>([]);

  const selection: EuiTableSelectionType<TodoEntity> = {
    selectableMessage: (selectable: boolean, todoItem: TodoEntity) =>
      !selectable ? `${todoItem.title} is completed` : `Select ${todoItem.title}`,
    onSelectionChange: (selectedItems: TodoEntity[]) => {
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
