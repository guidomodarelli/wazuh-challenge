import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiDatePicker,
  EuiFieldText,
  EuiForm,
  EuiFormErrorText,
  EuiFormRow,
} from '@elastic/eui';
import { zodResolver } from '@hookform/resolvers/zod';
import moment, { Moment } from 'moment';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateTodoItem, Priority, Status } from '../../../common/types';
import TodoPriority from '../TodoBadges/TodoBadgePriority';
import TodoStatus from '../TodoBadges/TodoBadgeStatus';
import './TodoForm.styles.scss';
import { FieldValues, schema } from './schema';
import { TodoContext } from '../../context/todo.context';
import { Option } from "../../types/option";
import { mapOptions } from "../../utils/map_options";

interface TodoFormProps {
  id: string;
  update?: boolean;
  onSuccess?: () => void;
}

const TodoForm = ({ id, update, onSuccess }: TodoFormProps) => {
  const { createTodo } = React.useContext(TodoContext);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      status: [Status.NOT_STARTED],
      priority: [Priority.LOW],
      dueDate: undefined,
      plannedDate: undefined,
      startedDate: undefined,
      completedDate: undefined,
    },
  });

  /**
   * The function `renderStatusOptions` renders a `TodoStatus` component based on the label value of the provided
   * `EuiComboBoxOptionOption` option.
   * @param value - an object that represents an option in a combo box, where the `label` property is of type `Status`.
   */
  const renderStatusOptions = (value: EuiComboBoxOptionOption<Option<typeof Status>>) => (
    <TodoStatus variant={value.label as Status} />
  );

  /**
   * The function `renderPriorityOptions` renders a `TodoPriority` component based on the selected value from a combo
   * box.
   * @param value - an object likely contains information about a priority option for a todo item.
   */
  const renderPriorityOptions = (value: EuiComboBoxOptionOption<Option<typeof Priority>>) => (
    <TodoPriority variant={value.label as Priority} />
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
    };
    createTodo(newTodo);
    reset();
    onSuccess?.();
  };

  return (
    <div className="todo-form-container">
      <EuiForm id={id} component="form" onSubmit={handleSubmit(submitHandler)}>
        <Controller
          control={control}
          name="title"
          render={({ field: { ref, ...otherFields } }) => (
            <EuiFormRow
              label="Title"
              fullWidth
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiFieldText
                {...otherFields}
                inputRef={ref}
                isInvalid={isInvalid(otherFields.name)}
                fullWidth
                placeholder="Todo title"
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { ref, value: options, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Status"
              fullWidth
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiComboBox
                {...otherFields}
                inputRef={ref}
                isInvalid={isInvalid(otherFields.name)}
                fullWidth
                options={mapOptions(Status)}
                onChange={(options) => onChange(options.map((option) => option.label))}
                singleSelection={true}
                selectedOptions={options?.map((option) => ({ label: option }))}
                renderOption={renderStatusOptions}
                isClearable={false}
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="priority"
          render={({ field: { ref, value: options, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Priority"
              fullWidth
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiComboBox
                {...otherFields}
                inputRef={ref}
                isInvalid={isInvalid(otherFields.name)}
                fullWidth
                options={mapOptions(Priority)}
                onChange={(options) => onChange(options.map((option) => option.label))}
                singleSelection={true}
                selectedOptions={options.map((option) => ({ label: option }))}
                renderOption={renderPriorityOptions}
                isClearable={false}
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="plannedDate"
          render={({ field: { ref: _ref /* Not used */, value, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Plan to execute it"
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiDatePicker
                {...otherFields}
                isInvalid={isInvalid(otherFields.name)}
                selected={moment(value)}
                onChange={changePlannedDateHandler}
                onClear={() => changePlannedDateHandler()}
                placeholder={'Select a date'}
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { ref: _ref /* Not used */, value, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Due date"
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiDatePicker
                {...otherFields}
                isInvalid={isInvalid(otherFields.name)}
                selected={moment(value)}
                onChange={changeDueDateHandler}
                onClear={() => changeDueDateHandler()}
                placeholder={'Select a due date'}
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="startedDate"
          render={({ field: { ref: _ref /* Not used */, value, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Started date"
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiDatePicker
                {...otherFields}
                isInvalid={isInvalid(otherFields.name)}
                selected={moment(value)}
                onChange={changeStartedDateHandler}
                onClear={() => changeStartedDateHandler()}
                placeholder={'Select a started date'}
              />
            </EuiFormRow>
          )}
        />
        <Controller
          control={control}
          name="completedDate"
          render={({ field: { ref: _ref /* Not used */, value, onChange, ...otherFields } }) => (
            <EuiFormRow
              label="Completed date"
              isInvalid={isInvalid(otherFields.name)}
              error={errors[otherFields.name]?.message}
            >
              <EuiDatePicker
                {...otherFields}
                isInvalid={isInvalid(otherFields.name)}
                selected={moment(value)}
                onChange={changeCompletedDateHandler}
                onClear={() => changeCompletedDateHandler()}
                placeholder={'Select a completed date'}
              />
            </EuiFormRow>
          )}
        />
        {isInvalid('root') && <EuiFormErrorText>{errors.root?.message}</EuiFormErrorText>}
      </EuiForm>
    </div>
  );
};

export default TodoForm;
