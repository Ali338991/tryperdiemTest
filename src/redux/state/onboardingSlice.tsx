import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@store/store';
import {persistReducer} from 'redux-persist';

const initialState = {
  isOnboarded: false,
};

export const selectIsOnboarded = (state: RootState) =>
  state.onboarding.isOnboarded;

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    onboard: state => {
      state.isOnboarded = false;
    },
    onboarded: state => {
      state.isOnboarded = true;
    },
  },
});

export default persistReducer(
  {
    key: onboardingSlice.name,
    storage: AsyncStorage,
    timeout: 0,
    whitelist: ['isOnboarded'],
  },
  onboardingSlice.reducer,
);
export const {onboard, onboarded} = onboardingSlice.actions;
