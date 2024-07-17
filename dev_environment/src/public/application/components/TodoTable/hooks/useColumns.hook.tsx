import { EuiBadge, EuiBasicTableColumn, EuiText } from '@elastic/eui';
import { Status } from '../../../../core/domain/entities/Status';
import React from 'react';
import TodoBadgePriority from '../../TodoBadges/TodoBadgePriority';
import TodoBadgeStatus from '../../TodoBadges/TodoBadgeStatus';
import { TodoEntity } from "../../../../core/domain/entities/TodoEntity";

interface UseColumnsProps {
  onActionEdit: (todoItem: TodoEntity) => void;
  onActionDelete: (todoItem: TodoEntity) => void;
}

function useColumns({ onActionEdit: onEdit, onActionDelete: onDelete }: UseColumnsProps) {
  const columns: Array<EuiBasicTableColumn<TodoEntity>> = [
    {
      field: 'title',
      name: 'Title',
      sortable: true,
      footer: <em>Page totals:</em>,
    },
    {
      id: 'tags',
      name: 'Tags',
      'data-test-subj': 'tagsCell',
      render: ({ tags }: TodoEntity) => (
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
      footer: ({ items }: { items: TodoEntity[] }) => {
        const uniqueUsers = new Set(items.map((todoItem) => todoItem.assignee));
        return <>{uniqueUsers.size} users</>;
      },
      render: ({ assignee }: TodoEntity) => <EuiText>{assignee}</EuiText>,
    },
    {
      id: 'status',
      name: 'Status',
      'data-test-subj': 'statusCell',
      footer: ({ items }: { items: TodoEntity[] }) => {
        const completedTodoItems = items.reduce(
          (previous, { status }) => (status === Status.COMPLETED ? previous + 1 : previous),
          0
        );
        return (
          <>
            {completedTodoItems}/{items.length} completed
          </>
        );
      },
      render: ({ status }: TodoEntity) => <TodoBadgeStatus variant={status} />,
    },
    {
      id: 'priority',
      name: 'Priority',
      'data-test-subj': 'priorityCell',
      render: ({ priority }: TodoEntity) => <TodoBadgePriority variant={priority} />,
    },
    {
      id: 'createdAt',
      name: 'Created at',
      'data-test-subj': 'createdAtCell',
      render: ({ createdAt }: TodoEntity) =>
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
