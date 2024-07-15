import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
} from '@elastic/eui';
import React from 'react';
import TodoForm from './TodoForm';
import { FormattedMessage } from '@osd/i18n/react';
import { type FieldValues } from './schema';

interface FlyoutFormProps {
  onClose: () => void;
  itemIdToUpdate?: string;
  defaultValues?: Partial<FieldValues>;
}

const FlyoutForm = ({ onClose, itemIdToUpdate, defaultValues = {} }: FlyoutFormProps) => {
  const formId = 'todo-form';

  return (
    <EuiFlyout onClose={onClose}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle>
          <h2>
            {!!itemIdToUpdate ? (
              <FormattedMessage id="todoPlugin.title.updateTodo" defaultMessage="Update TODO" />
            ) : (
              <FormattedMessage id="todoPlugin.title.createTodo" defaultMessage="Create new TODO" />
            )}
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <TodoForm id={formId} onSuccess={onClose} itemIdToUpdate={itemIdToUpdate} defaultValues={defaultValues} />
      </EuiFlyoutBody>
      <EuiFlyoutFooter className="footer">
        <EuiButtonEmpty onClick={onClose}>
          <FormattedMessage id="todoPlugin.button.cancel" defaultMessage="Cancel" />
        </EuiButtonEmpty>
        <EuiButton type="submit" form={formId} fill color="primary">
          {!!itemIdToUpdate ? (
            <FormattedMessage id="todoPlugin.button.update" defaultMessage="Update" />
          ) : (
            <FormattedMessage id="todoPlugin.button.create" defaultMessage="Create" />
          )}
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

export default FlyoutForm;
