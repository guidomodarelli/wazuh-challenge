import {
  EuiComboBox,
  EuiDatePicker,
  EuiFieldText,
  EuiForm,
  EuiFormErrorText,
  EuiFormRow,
} from '@elastic/eui';
import moment from 'moment';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Priority, Status } from '../../../common/types';
import { mapOptions } from '../../utils/map_options';
import './TodoForm.styles.scss';
import useTodoForm from './useTodoForm';
import { FieldValues } from "./schema";

interface TodoFormProps {
  id: string;
  itemIdToUpdate?: string;
  onSuccess?: () => void;
  defaultValues?: Partial<FieldValues>;
}

const TodoForm = ({ id, itemIdToUpdate, onSuccess, defaultValues = {} }: TodoFormProps) => {
  const {
    onSubmit,
    control,
    isInvalid,
    formState: { errors },
    renderStatusOptions,
    renderPriorityOptions,
    changePlannedDateHandler,
    changeDueDateHandler,
    changeStartedDateHandler,
    changeCompletedDateHandler,
  } = useTodoForm({ onSuccess, itemIdToUpdate, defaultValues });

  return (
    <div className="todo-form-container">
      <EuiForm id={id} component="form" onSubmit={onSubmit}>
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
                selectedOptions={options?.map((option) => ({ label: option }))}
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
