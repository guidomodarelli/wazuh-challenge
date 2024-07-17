import React from 'react';
import { TodoItem } from '../../../common/types';
import { useTodoContext } from '../../context/TodoContext';
import FlyoutForm from '../TodoForm/FlyoutForm';

interface UseFlyoutFormProps {
  onClose?: () => void;
  itemIdToUpdate?: string;
}

const useFlyoutForm = ({ onClose, itemIdToUpdate }: UseFlyoutFormProps) => {
  const { filteredTodoItems } = useTodoContext();
  const [isFlyoutVisible, setIsFlyoutVisible] = React.useState(false);

  const openFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
    onClose?.();
  };

  let flyout;
  const setFlyout = (itemToUpdate?: TodoItem) => {
    flyout = (
      <FlyoutForm
        itemIdToUpdate={itemIdToUpdate}
        defaultValues={itemToUpdate}
        onClose={closeFlyout}
      />
    );
  };
  if (isFlyoutVisible) {
    const itemToUpdate = filteredTodoItems.find((item) => item.id === itemIdToUpdate);
    setFlyout(itemToUpdate);
  }

  return {
    flyout,
    openFlyout,
    closeFlyout,
  };
};

export default useFlyoutForm;
