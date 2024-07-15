import { act, renderHook } from '@testing-library/react-hooks';
import * as ReactHookForm from 'react-hook-form';
import { mockTodoContextFn } from '../../../__mocks__/todo-context.mock';
import { Priority, Status } from '../../../common/types';
import * as TodoContext from "../../context/todo.context";
import useTodoForm from './useTodoForm';

let mockTodoContext: ReturnType<typeof mockTodoContextFn>;

let mockUseForm: {
  handleSubmit: jest.Mock;
  formState: {
    errors: {};
  };
  reset: jest.Mock;
};

let onSuccess: jest.Mock;

describe('useTodoForm', () => {
  beforeEach(() => {
    onSuccess = jest.fn();

    mockTodoContext = mockTodoContextFn(jest);

    mockUseForm = {
      handleSubmit: jest.fn().mockImplementation(() => jest.fn()),
      formState: { errors: {} },
      reset: jest.fn(),
    };

    jest.spyOn(TodoContext, 'useTodoContext').mockImplementation(() => mockTodoContext);
    // @ts-expect-error
    jest.spyOn(ReactHookForm, 'useForm').mockImplementation(() => mockUseForm);
  });

  it('verify successful create submission and reset with initial values ', () => {
    const { result } = renderHook(() => useTodoForm({ onSuccess }));

    act(() => {
      result.current.onSubmit();
      result.current.submitHandler({
        title: '',
        status: [Status.NOT_STARTED],
        priority: [Priority.LOW],
        isCompleted: false,
      });
    });

    expect(mockTodoContext.createTodo).toHaveBeenCalledTimes(1);
    expect(mockUseForm.reset).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('verify successful update submission and reset with initial values', () => {
    const { result } = renderHook(() => useTodoForm({ onSuccess, itemIdToUpdate: 'asda' }));

    act(() => {
      result.current.submitHandler({
        title: '',
        status: [Status.NOT_STARTED],
        priority: [Priority.LOW],
        isCompleted: false,
      });
    });

    expect(mockTodoContext.updateTodo).toHaveBeenCalledTimes(1);
    expect(mockUseForm.reset).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
