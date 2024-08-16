import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type StackParamList = {
  Home: undefined
  Login: undefined
}

export type StackNavigation = NavigationProp<StackParamList>
export type StackRoute<T extends keyof StackParamList> = RouteProp<StackParamList, T>
export type StackScreen<T extends keyof StackParamList> = NativeStackScreenProps<StackParamList, T>

export type TabParamList = {
  HomeTab: undefined
  SettingTab: undefined
}

export type TabNavigation = NavigationProp<TabParamList>
export type TabRoute<T extends keyof TabParamList> = RouteProp<TabParamList, T>
export type TabScreen<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>
