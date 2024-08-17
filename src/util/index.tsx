import {Todo} from '@app/types/todo';
import {format} from 'date-fns';

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getMessage = (todos: Todo[]) => {
  return todos
    ?.reduce((acc, item) => {
      if (item?.completed) {
        return acc + ' ' + item?.title;
      }
      return acc;
    }, '')
    .trim();
};
export const formatDateTime = (date: Date | string) => {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm:ss a');
};
