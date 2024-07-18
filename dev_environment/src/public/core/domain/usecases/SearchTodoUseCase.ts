import { TodoEntity } from '../entities/TodoEntity';

export const searchTodoUseCase = () => (search: string) => (todoToSearch: TodoEntity) => {
  const { title, assignee, tags } = todoToSearch;
  const lc_title = title.toLowerCase();
  const lc_assignee = assignee?.toLowerCase() ?? '';
  const lc_search = search.toLowerCase();

  // You can complicate it as much as you want
  return (
    lc_title.includes(lc_search) ||
    lc_assignee.includes(lc_search) ||
    tags?.some((tag) => tag.toLowerCase().includes(lc_search))
  );
};

export type SearchTodoUseCase = ReturnType<typeof searchTodoUseCase>;
