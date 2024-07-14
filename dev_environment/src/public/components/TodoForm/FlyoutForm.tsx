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
import { FieldValues } from "./schema";

interface FlyoutFormProps {
  onClose: () => void;
  defaultValues?: Partial<FieldValues>;
}

const FlyoutForm = ({ onClose, defaultValues }: FlyoutFormProps) => {
  const formId = 'todo-form';

  return (
    <EuiFlyout onClose={onClose}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle>
          <h2>
            <FormattedMessage id="todoPlugin.title.createTodo" defaultMessage="Create new TODO" />
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <TodoForm id={formId} onSuccess={onClose} defaultValues={defaultValues} />
      </EuiFlyoutBody>
      <EuiFlyoutFooter className="footer">
        <EuiButtonEmpty onClick={onClose}>
          <FormattedMessage id="todoPlugin.button.cancel" defaultMessage="Cancel" />
        </EuiButtonEmpty>
        <EuiButton type="submit" form={formId} fill color="primary">
          <FormattedMessage id="todoPlugin.button.create" defaultMessage="Create" />
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
};

export default FlyoutForm;
