import { EuiBadge, EuiBasicTableColumn, EuiIcon, EuiText } from '@elastic/eui';
import { TodoItem } from '../../../common/types';
import React from 'react';
import TodoBadgeStatus from '../TodoBadges/TodoBadgeStatus';
import TodoBadgePriority from '../TodoBadges/TodoBadgePriority';

interface UseColumnsProps {
  onActionEdit: (todoItem: TodoItem) => void;
  onActionDelete: (todoItem: TodoItem) => void;
}

function useColumns({ onActionEdit: onEdit, onActionDelete: onDelete }: UseColumnsProps) {
  const columns: Array<EuiBasicTableColumn<TodoItem>> = [
    {
      field: 'title',
      name: 'Title',
      sortable: true,
    },
    {
      id: 'tags',
      name: 'Tags',
      'data-test-subj': 'tagsCell',
      render: ({ tags }: TodoItem) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {tags?.map((tag, index) => (
            <EuiBadge key={`${tag}-${index}`} color="default">
              {tag}
            </EuiBadge>
          ))}
        </div>
      ),
    },
    {
      id: 'assignee',
      name: 'Assignee',
      render: ({ assignee }: TodoItem) => <EuiText>{assignee}</EuiText>,
    },
    {
      id: 'status',
      name: 'Status',
      'data-test-subj': 'statusCell',
      render: ({ status }: TodoItem) => <TodoBadgeStatus variant={status} />,
    },
    {
      id: 'priority',
      name: 'Priority',
      'data-test-subj': 'priorityCell',
      render: ({ priority }: TodoItem) => <TodoBadgePriority variant={priority} />,
    },
    {
      id: 'isCompleted',
      name: 'Is completed',
      'data-test-subj': 'isCompletedCell',
      render: ({ isCompleted }: TodoItem) => (isCompleted ? <EuiIcon type="check" /> : <></>),
    },
    {
      id: 'createdAt',
      name: 'Created at',
      'data-test-subj': 'createdAtCell',
      render: ({ createdAt }: TodoItem) =>
        createdAt ? <EuiText>{new Date(createdAt).toLocaleDateString()}</EuiText> : <></>,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Edit',
          description: 'Delete this Todo item',
          icon: 'pencil',
          type: 'icon',
          onClick: onEdit,
        },
        {
          name: 'Delete',
          description: 'Delete this Todo item',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: onDelete,
        },
      ],
    },
  ];

  return {
    columns,
  };
}

export default useColumns;
