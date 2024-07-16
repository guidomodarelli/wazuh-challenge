import {
  EuiComboBox,
  EuiFieldText,
  EuiForm,
  EuiFormErrorText,
  EuiFormRow,
} from '@elastic/eui';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Priority, Status } from '../../../common/types';
import { mapOptions } from '../../utils/map_options';
import { FieldValues } from './schema';
import './TodoForm.styles.scss';
import useTodoForm from './useTodoForm';

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
        {isInvalid('root') && <EuiFormErrorText>{errors.root?.message}</EuiFormErrorText>}
      </EuiForm>
    </div>
  );
};

export default TodoForm;
