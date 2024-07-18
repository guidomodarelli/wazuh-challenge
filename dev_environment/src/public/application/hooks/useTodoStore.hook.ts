import { i18n } from '@osd/i18n';
import { NotificationsStart } from 'opensearch-dashboards/public';
import { useState } from 'react';
import { TodoEntity, TodoEntityRequest } from '../../core/domain/entities/TodoEntity';

function useTodoStore(notifications: NotificationsStart) {
  const [todoItems, setTodoItems] = useState<TodoEntity[]>([]);

  const saveTodoInStore = (newTodo: TodoEntity) => {
    notifications.toasts.addSuccess(
      i18n.translate('todoPlugin.todoItemCreatedSuccessfully', {
        defaultMessage: 'Todo item successfully created',
      })
    );
    setTodoItems([newTodo, ...todoItems]);
  };

  const updateTodoInStore = (itemIdToUpdate: string, updatedItem: TodoEntityRequest) => {
    notifications.toasts.addSuccess(
      i18n.translate('todoPlugin.todoItemUpdatedSuccessfully', {
        defaultMessage: 'Todo item updated successfully',
      })
    );
    const newTodos = todoItems.map((previousTodo) => {
      if (previousTodo.id === itemIdToUpdate) {
        return { ...previousTodo, ...updatedItem };
      }
      return previousTodo;
    });
    setTodoItems(newTodos);
  };

  const removeTodosInStore = (...ids: string[]) => {
    notifications.toasts.addSuccess(
      i18n.translate('todoPlugin.todoItemsDeletedSuccessfully', {
        defaultMessage: 'Todo items deleted successfully',
      })
    );
    setTodoItems(todoItems.filter((todo) => !ids.includes(todo.id)));
  };

  const addSampleDataInStore = (newTodos: TodoEntity[]) => {
    notifications.toasts.addSuccess(
      i18n.translate('todoPlugin.todoItemsCreatedSuccessfully', {
        defaultMessage: 'Todo items created successfully',
      })
    );
    setTodoItems([...newTodos, ...todoItems]);
  };

  return {
    todoItems,
    saveTodoInStore,
    updateTodoInStore,
    removeTodosInStore,
    addSampleDataInStore,
    setTodoItemsInStore: setTodoItems,
  };
}

export default useTodoStore;
