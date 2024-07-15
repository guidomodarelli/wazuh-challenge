import { EuiTableSelectionType } from '@elastic/eui';
import { TodoItem } from '../../../common/types';
import { useState } from 'react';

function useSelectedItems() {
  const [selectedItems, setSelectedItems] = useState<TodoItem['id'][]>([]);

  const onSelectionChange = (selectedItems: TodoItem[]) => {
    setSelectedItems(selectedItems.map((todoItem) => todoItem.id));
  };

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

export default useSelectedItems;
