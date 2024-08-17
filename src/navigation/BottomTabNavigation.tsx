import React from 'react';
import {TabParamList} from '@app/types/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLOR} from '@app/constant/color';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '@screens/home/HomeScreen';
import SettingScreen from '@screens/setting/SettingScreen';
import {hp, normalizeDimension, scaleFontSize} from '@app/util/design';
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
        component={HomeScreen}
        options={() => ({
          tabBarLabel: 'Home',
          tabBarActiveTintColor: COLOR.primaryColor,
          tabBarIcon: ({color, size}) =>
            renderIcon({name: 'home', color, size}),
        })}
      />
      <BottomTab.Screen
        name="SettingTab"
        component={SettingScreen}
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
    paddingHorizontal: normalizeDimension(10),
    paddingBottom: normalizeDimension(15),
    paddingTop: normalizeDimension(15),
    height: hp(74),
  },
  label: {
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    lineHeight: 16,
  },
});
