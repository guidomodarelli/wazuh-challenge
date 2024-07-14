import { EuiBadge } from '@elastic/eui';
import React from 'react';
import { Priority } from '../../../common/types';

const TodoPrioritys = {
  Low: () => <EuiBadge color="lightblue">{Priority.LOW}</EuiBadge>,
  Medium: () => <EuiBadge color="blue">{Priority.MEDIUM}</EuiBadge>,
  High: () => <EuiBadge color="purple">{Priority.HIGH}</EuiBadge>,
  Critical: () => <EuiBadge color="black">{Priority.CRITICAL}</EuiBadge>,
};

interface TodoPriorityProps {
  variant: Priority;
}

const TodoPriority = ({variant}: TodoPriorityProps) => {
  switch (variant) {
    case Priority.MEDIUM:
      return <TodoPrioritys.Medium />;
    case Priority.HIGH:
      return <TodoPrioritys.High />;
    case Priority.CRITICAL:
      return <TodoPrioritys.Critical />;
    default:
      return <TodoPrioritys.Low />;
  }
};

export default TodoPriority;
