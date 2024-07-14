import { EuiBadge } from '@elastic/eui';
import React from 'react';
import { Status } from '../../../common/types';

const TodoStatuses = {
  Error: () => <EuiBadge color="danger">{Status.EXECUTED_WITH_ERROR}</EuiBadge>,
  Success: () => <EuiBadge color="success">{Status.DONE}</EuiBadge>,
  Working: () => <EuiBadge color="orange">{Status.IN_PROGRESS}</EuiBadge>,
  NotStarted: () => <EuiBadge color="lightgray">{Status.NOT_STARTED}</EuiBadge>,
};

interface TodoStatusProps {
  variant: Status;
}

const TodoStatus = ({ variant }: TodoStatusProps) => {
  switch (variant) {
    case Status.DONE:
      return <TodoStatuses.Success />;
    case Status.IN_PROGRESS:
      return <TodoStatuses.Working />;
    case Status.EXECUTED_WITH_ERROR:
      return <TodoStatuses.Error />;
    default:
      return <TodoStatuses.NotStarted />;
  }
};

export default TodoStatus;
