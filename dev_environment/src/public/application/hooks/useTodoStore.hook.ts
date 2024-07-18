import { i18n } from '@osd/i18n';
import { NotificationsStart } from 'opensearch-dashboards/public';
import { useState } from 'react';
import { TodoEntity, TodoEntityRequest } from '../../core/domain/entities/TodoEntity';

function useTodoStore(notifications: NotificationsStart) {
  const [todoItems, setTodoItems] = useState<TodoEntity[]>([]);

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

  const saveTodosInStore = (newTodos: TodoEntity[]) => {
    if (newTodos.length === 1) {
      notifications.toasts.addSuccess(
        i18n.translate('todoPlugin.todoItemCreatedSuccessfully', {
          defaultMessage: 'Todo item successfully created',
        })
      );
    } else {
      notifications.toasts.addSuccess(
        i18n.translate('todoPlugin.todoItemsCreatedSuccessfully', {
          defaultMessage: 'Todo items saved successfully',
        })
      );
    }
    setTodoItems([...newTodos, ...todoItems]);
  };

  return {
    todoItems,
    updateTodoInStore,
    removeTodosInStore,
    saveTodosInStore,
    setTodoItemsInStore: setTodoItems,
  };
}

export default useTodoStore;
