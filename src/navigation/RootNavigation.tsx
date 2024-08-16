import React from 'react';
import {StackParamList} from '@app/types/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '@screens/Auth/LoginScreen';
import BottomTabsNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator<StackParamList>();

export default function RootNavigation() {
  const isLoggedIn = false;
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
