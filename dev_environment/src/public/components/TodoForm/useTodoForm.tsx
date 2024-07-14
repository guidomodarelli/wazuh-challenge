import { EuiComboBoxOptionOption } from '@elastic/eui';
import { Moment } from 'moment';
import React from 'react';
import { CreateTodoItem, Priority, Status } from '../../../common/types';
import { TodoContext } from '../../context/todo.context';
import { Option } from '../../types/option';
import { FieldValues, schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import TodoBadgeStatus from '../TodoBadges/TodoBadgeStatus';
import TodoBadgePriority from '../TodoBadges/TodoBadgePriority';

interface UseTodoFormProps {
  onSuccess?: () => void;
  defaultValues?: Partial<FieldValues>;
}

function useTodoForm({ onSuccess, defaultValues }: UseTodoFormProps) {
  const { createTodo } = React.useContext(TodoContext);
  const { handleSubmit, control, setValue, formState, trigger, reset } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues.title ?? '',
      status: defaultValues.status ?? [Status.NOT_STARTED],
      priority: defaultValues.priority ?? [Priority.LOW],
      dueDate: defaultValues.dueDate ?? undefined,
      plannedDate: defaultValues.plannedDate ?? undefined,
      startedDate: defaultValues.startedDate ?? undefined,
      completedDate: defaultValues.completedDate ?? undefined,
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
   * The function `changePlannedDateHandler` updates the value of the 'plannedDate' field and triggers validation for
   * 'plannedDate' and 'dueDate'.
   */
  const changePlannedDateHandler = (moment?: Moment | null) => {
    setValue('plannedDate', moment?.toDate());
    trigger('plannedDate');
    trigger('dueDate');
  };

  /**
   * The `changeDueDateHandler` function sets the value of a form field to the selected date and triggers a validation
   * check.
   */
  const changeDueDateHandler = (moment?: Moment | null) => {
    setValue('dueDate', moment?.toDate());
    trigger('dueDate');
  };

  /**
   * The function `changeStartedDateHandler` updates the value of the 'startedDate' field and triggers validation for
   * 'startedDate' and 'completedDate'.
   */
  const changeStartedDateHandler = (moment?: Moment | null) => {
    setValue('startedDate', moment?.toDate());
    trigger('startedDate');
    trigger('completedDate');
  };

  /**
   * The function `changeCompletedDateHandler` sets the value of a completed date field and triggers a validation check.
   */
  const changeCompletedDateHandler = (moment?: Moment | null) => {
    setValue('completedDate', moment?.toDate());
    trigger('completedDate');
  };

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
    const newTodo: CreateTodoItem = {
      ...data,
      priority: data.priority[0],
      status: data.status[0],
      dueDate: data.dueDate?.toISOString(),
      plannedDate: data.plannedDate?.toISOString(),
      startedDate: data.startedDate?.toISOString(),
      completedDate: data.completedDate?.toISOString(),
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
    control,
    formState,
    renderStatusOptions,
    renderPriorityOptions,
    isInvalid,
    changePlannedDateHandler,
    changeStartedDateHandler,
    changeDueDateHandler,
    changeCompletedDateHandler,
  };
}

export default useTodoForm;
