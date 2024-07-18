import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
  htmlIdGenerator
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import React from 'react';
import TodoForm from './TodoForm';

interface FlyoutFormProps {
  onClose: () => void;
  itemIdToUpdate?: string;
}

const FlyoutForm = ({ onClose, itemIdToUpdate }: FlyoutFormProps) => {
  const formId = htmlIdGenerator('todo-form');

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
        <TodoForm formId={formId()} onSuccess={onClose} itemIdToUpdate={itemIdToUpdate} />
      </EuiFlyoutBody>
      <EuiFlyoutFooter className="footer">
        <EuiButtonEmpty onClick={onClose}>
          <FormattedMessage id="todoPlugin.button.cancel" defaultMessage="Cancel" />
        </EuiButtonEmpty>
        <EuiButton type="submit" form={formId()} fill color="primary">
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
