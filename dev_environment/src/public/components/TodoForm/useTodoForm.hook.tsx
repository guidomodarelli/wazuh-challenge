import { EuiComboBoxOptionOption } from '@elastic/eui';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Priority, Status, TodoItemRequest } from '../../../common/types';
import { useTodoContext } from '../../context/TodoContext';
import { Option } from '../../types/option';
import TodoBadgePriority from '../TodoBadges/TodoBadgePriority';
import TodoBadgeStatus from '../TodoBadges/TodoBadgeStatus';
import { FieldValues, schema } from './schema';

interface UseTodoFormProps {
  onSuccess?: () => void;
  itemIdToUpdate?: string;
  defaultValues?: Partial<FieldValues>;
}

function useTodoForm({ onSuccess, itemIdToUpdate, defaultValues = {} }: UseTodoFormProps) {
  const { createTodo, updateTodo } = useTodoContext();
  const { handleSubmit, control, formState, reset } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues.title ?? '',
      status: defaultValues.status ?? [Status.NOT_STARTED],
      priority: defaultValues.priority ?? [Priority.LOW],
    },
  });
  const { errors } = formState;

  /**
   * The function `renderStatusOptions` renders a `TodoStatus` component based on the label value of the provided
   * `EuiComboBoxOptionOption` option.
   * @param value - an object that represents an option in a combo box, where the `label` property is of type `Status`.
   */
  const renderStatusOptions = (value: EuiComboBoxOptionOption<Option<typeof Status>>) => (
    <TodoBadgeStatus variant={value.label as Status} />
  );

  /**
   * The function `renderPriorityOptions` renders a `TodoPriority` component based on the selected value from a combo
   * box.
   * @param value - an object likely contains information about a priority option for a todo item.
   */
  const renderPriorityOptions = (value: EuiComboBoxOptionOption<Option<typeof Priority>>) => (
    <TodoBadgePriority variant={value.label as Priority} />
  );

  /**
   * The function `isInvalid` checks if there is an error message for a specific field in a set of `FieldValues`.
   * @param {keyof FieldValues | 'root'} field - a key of `FieldValues` or the string `'root'`.
   * @returns a boolean value indicating whether there is a message associated with the `field` in the `errors` object.
   * If there is a message, it will return `true`, otherwise it will return `false`.
   */
  const isInvalid = (field: keyof FieldValues | 'root') => {
    return !!errors[field]?.message;
  };

  /**
   * The submitHandler function creates a new todo item based on the form data, then calls the createTodo function,
   * resets the form, and triggers the onSuccess callback if provided.
   * @param data - It is being used to create a new todo item (`newTodo`).
   */
  const submitHandler: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const newTodo: TodoItemRequest = {
      ...data,
      priority: data.priority[0],
      status: data.status[0],
    };
    if (!!itemIdToUpdate) {
      updateTodo(itemIdToUpdate, newTodo)
    } else {
      createTodo(newTodo);
    }
    reset();
    onSuccess?.();
  };

  return {
    onSubmit: handleSubmit(submitHandler),
    submitHandler,
    control,
    formState,
    renderStatusOptions,
    renderPriorityOptions,
    isInvalid,
  };
}

export default useTodoForm;
