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
    },
  });

  const renderStatusOptions = (value: EuiComboBoxOptionOption<Option<typeof Status>>) => (
    <TodoStatus variant={value.label as Status} />
  );

  const renderPriorityOptions = (value: EuiComboBoxOptionOption<Option<typeof Priority>>) => (
    <TodoPriority variant={value.label as Priority} />
  );

  /**
   * The function `changePlannedDateHandler` takes an `onChange` function and a `moment` parameter, converts the `moment`
   * to a Date object, and triggers a 'dueDate' event.
   */
  const changePlannedDateHandler = (moment?: Moment | null) => {
    setValue('plannedDate', moment?.toDate());
    trigger('plannedDate');
    trigger('dueDate');
  };

  const changeDueDateHandler = (moment?: Moment | null) => {
    setValue('dueDate', moment?.toDate());
    trigger('dueDate');
  };

  const isInvalid = (field: keyof FieldValues | 'root') => {
    return !!errors[field]?.message;
  };

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
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
        {isInvalid('root') && <EuiFormErrorText>{errors.root?.message}</EuiFormErrorText>}
      </EuiForm>
    </div>
  );
};

export default TodoForm;
