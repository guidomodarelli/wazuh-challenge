import { EuiBadge } from '@elastic/eui';
import React from 'react';
import { Priority } from '../../../common/types';

const TodoPriorities = {
  Low: () => <EuiBadge color="lightblue">{Priority.LOW}</EuiBadge>,
  Medium: () => <EuiBadge color="blue">{Priority.MEDIUM}</EuiBadge>,
  High: () => <EuiBadge color="purple">{Priority.HIGH}</EuiBadge>,
  Critical: () => <EuiBadge color="black">{Priority.CRITICAL}</EuiBadge>,
};

interface TodoPriorityProps {
  variant?: Priority;
}

const TodoBadgePriority = ({variant}: TodoPriorityProps) => {
  switch (variant) {
    case Priority.MEDIUM:
      return <TodoPriorities.Medium />;
    case Priority.HIGH:
      return <TodoPriorities.High />;
    case Priority.CRITICAL:
      return <TodoPriorities.Critical />;
    default:
      return <TodoPriorities.Low />;
  }
};

export default TodoBadgePriority;
