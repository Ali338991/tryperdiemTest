import store, {persistor, useAppSelector} from '@store/store';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import RootNavigation from '@app/navigation/RootNavigation';
import OnboardingScreen from '@screens/onboarding/OnboardingScreen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const AppLoad = () => {
    const isOnboarded = useAppSelector(state => state.onboarding.isOnboarded);
    SplashScreen.hide();
    if (!isOnboarded) {
      return <OnboardingScreen />;
    }
    return <RootNavigation />;
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer theme={DefaultTheme}>
            <StatusBar
              backgroundColor="transparent"
              barStyle="dark-content"
              translucent={true}
            />
            <AppLoad />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
