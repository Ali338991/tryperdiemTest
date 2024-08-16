import React from 'react';
import {StackParamList} from '@app/types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/auth/LoginScreen';
import BottomTabsNavigation from './BottomTabNavigation';
import {useAppSelector} from '@store/store';

const Stack = createNativeStackNavigator<StackParamList>();

export default function RootNavigation() {
  const {isLoggedIn} = useAppSelector(state => state.auth);
  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarHidden: true,
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        gestureEnabled: true,
      }}>
      {!isLoggedIn && (
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      )}
      {isLoggedIn && (
        <Stack.Screen
          name="Home"
          component={BottomTabsNavigation}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}
