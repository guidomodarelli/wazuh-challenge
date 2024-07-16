import { EuiBadge } from '@elastic/eui';
import React from 'react';
import { Status } from '../../../common/types';

const TodoStatuses = {
  Error: () => <EuiBadge color="danger">{Status.EXECUTED_WITH_ERROR}</EuiBadge>,
  Success: () => <EuiBadge color="success">{Status.COMPLETED}</EuiBadge>,
  Working: () => <EuiBadge color="orange">{Status.IN_PROGRESS}</EuiBadge>,
  NotStarted: () => <EuiBadge color="lightgray">{Status.NOT_STARTED}</EuiBadge>,
};

interface TodoStatusProps {
  variant?: Status;
}

const TodoBadgeStatus = ({ variant }: TodoStatusProps) => {
  switch (variant) {
    case Status.COMPLETED:
      return <TodoStatuses.Success />;
    case Status.IN_PROGRESS:
      return <TodoStatuses.Working />;
    case Status.EXECUTED_WITH_ERROR:
      return <TodoStatuses.Error />;
    default:
      return <TodoStatuses.NotStarted />;
  }
};

export default TodoBadgeStatus;
