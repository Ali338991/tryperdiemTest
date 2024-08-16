import React from 'react';
import {TabParamList} from '@app/types/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@screens/Home';
import Setting from '@screens/Setting';
import {COLOR} from '@app/constant/color';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
type IconType = {
  name: string;
  color: string;
  size: number;
};
const BottomTab = createBottomTabNavigator<TabParamList>();

const renderIcon = ({color, size, name}: IconType) => (
  <Icon name={name} color={color} size={size} />
);
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
        options={() => ({
          tabBarLabel: 'Home',
          tabBarActiveTintColor: COLOR.primaryColor,
          tabBarIcon: ({color, size}) =>
            renderIcon({name: 'home', color, size}),
        })}
      />
      <BottomTab.Screen
        name="SettingTab"
        component={Setting}
        options={() => ({
          tabBarLabel: 'Setting',
          tabBarActiveTintColor: COLOR.primaryColor,
          tabBarIcon: ({color, size}) => renderIcon({name: 'cog', color, size}),
        })}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabsNavigation;
const styles = StyleSheet.create({
  tabBar: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 15,
    height: 74,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
});
