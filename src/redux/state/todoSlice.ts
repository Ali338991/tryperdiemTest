import {createAction, createReducer, current} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {List, Todo} from '@app/types/todo';
import { logout } from './authSlice';

type AuthState = {
  todos: Todo[];
  list: List[];
};

const initialState: AuthState = {
  todos: [],
  list: [],
};

export const initilizeTodo = createAction<Todo[]>('todo/initilize');
export const updateTodo = createAction<Todo>('todo/update');
export const addItemInList = createAction<List>('todo/addlist');
export const removeItemInList = createAction<number>('todo/removelistitem');

const todoReducer = createReducer(initialState, builder => {
  builder.addCase(addItemInList, (state, action) => {
    const {list} = current(state);
    state.list = [action.payload, ...list];
  });
  builder.addCase(removeItemInList, (state, action) => {
    const {list} = current(state);
    state.list = list?.filter(item => item.id !== action.payload);
  });
  builder.addCase(initilizeTodo, (state, action) => {
    state.todos = action.payload;
  });
  builder.addCase(updateTodo, (state, action) => {
    const {todos} = current(state);
    const updatedList = todos?.map(item => {
      if (action.payload.id === item?.id) {
        return {
          ...item,
          ...action.payload,
        };
      }
      return item;
    });
    state.todos = updatedList;
  });
  builder.addCase(logout, () => initialState);
});

export default persistReducer(
  {
    key: 'rtk:todos',
    storage: AsyncStorage,
    timeout: 0,
    whitelist: ['todos', 'list'],
  },
  todoReducer,
);
