import {Text, StyleSheet, ViewStyle, PressableProps} from 'react-native';
import React, {ReactNode} from 'react';
import PressableOpacity from './PressableOpacity';
import {COLOR} from '@app/constant/color';
type Props = {
  onPress: () => void;
  width?: number;
  children: ReactNode;
  style?: ViewStyle;
  loading?: boolean;
};
export default function Button({
  onPress,
  width,
  children,
  style,
  ...props
}: Props & PressableProps) {
  return (
    <PressableOpacity
      style={[styles.btn, {width: width}, style]}
      onPress={onPress}
      {...props}>
      <Text style={styles.btnText}>{children}</Text>
    </PressableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR.primaryColor,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: COLOR.white,
  },
});
