import {createAction, createReducer} from '@reduxjs/toolkit';
import {User} from '@app/types/user';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const login = createAction<User>('auth/login');
export const logout = createAction('auth/logout');

const authReducer = createReducer(initialState, builder => {
  builder.addCase(login, (state, action) => {
    state.isLoggedIn = true;
    state.user = action.payload;
  });
  builder.addCase(logout, () => initialState);
});

export default persistReducer(
  {
    key: 'rtk:auth',
    storage: AsyncStorage,
    timeout: 0,
    whitelist: ['isLoggedIn', 'user'],
  },
  authReducer,
);
