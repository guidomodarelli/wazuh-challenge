import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockTodoContextFn } from '../../../test/mocks/todo-context.mock';
import * as TodoContext from '../../context/TodoContext';
import TodoTable from './TodoTable';

let mockTodoContext: ReturnType<typeof mockTodoContextFn>;

describe('TodoTable', () => {
  beforeEach(() => {
    mockTodoContext = mockTodoContextFn(jest);

    jest.spyOn(TodoContext, 'useTodoContext').mockImplementation(() => mockTodoContext);
  });

  it("verify that clicking 'New' button displays FlyoutForm", () => {
    render(<TodoTable />);

    fireEvent.click(screen.getByText('New'));

    expect(screen.getByText('Create new TODO')).toBeTruthy();
  });
});
