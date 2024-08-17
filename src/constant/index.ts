import {Todo} from '@app/types/todo';
export const defaultTodoList: Todo[] = Array.from({length: 10}, (_, index) => ({
  id: index + 1,
  title: `Tag ${index + 1}`,
  completed: false,
}));
export const onboardingData = [
  {
    image: 'https://picsum.photos/200',
    title: 'Onboard slide 1',
    description: 'This is test description',
  },
  {
    image: 'https://picsum.photos/200',
    title: 'Onboard slide 2',
    description: 'This is test description',
  },
  {
    image: 'https://picsum.photos/200',
    title: 'Onboard slide 3',
    description: 'This is test description',
  },
];
