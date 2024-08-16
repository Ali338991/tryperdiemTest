import React from 'react';
import {TabParamList} from '@app/types/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/Home';
import Setting from '@screens/Setting';
import {COLOR} from '@app/constant/color';
import {StyleSheet} from 'react-native';

type IconType = {
  focused: boolean;
  color: string;
  size: number;
};
const BottomTab = createBottomTabNavigator<TabParamList>();

// const renderStyledHomeIcon = ({color, size, focused}: IconType) => (
//   <HomeIcon variant={focused ? 'Bold' : 'Outline'} color={color} size={size} />
// );
// const renderStyledServicesIcon = ({color, size, focused}: IconType) => (
//   <Flash variant={focused ? 'Bold' : 'Outline'} color={color} size={size} />
// );

const BottomTabsNavigation = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: COLOR.primaryColor,
          // tabBarIcon: renderStyledHomeIcon,
        }}
      />
      <BottomTab.Screen
        name="SettingTab"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarActiveTintColor: COLOR.primaryColor,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabsNavigation;
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLOR.backgroundColor,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});
