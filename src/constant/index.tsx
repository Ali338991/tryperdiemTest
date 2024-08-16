import {Todo} from '@app/types/todo';
export const defaultTodoList: Todo[] = Array.from({length: 10}, (_, index) => ({
  id: index + 1,
  title: `Tag ${index + 1}`,
  completed: false,
}));
