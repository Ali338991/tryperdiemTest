import {StyleSheet, ViewStyle, PressableProps} from 'react-native';
import React, {ReactNode} from 'react';
import {COLOR} from '@app/constant/color';
import {normalizeDimension} from '@app/util/design';
import Text from './Text';
import PressableButton from './PressableButton';
type Props = {
  onPress: () => void;
  width?: number;
  children: ReactNode;
  style?: ViewStyle;
  loading?: boolean;
  alignSelf?:
    | 'auto'
    | 'baseline'
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end';
};
export default function Button({
  onPress,
  width,
  children,
  style,
  alignSelf = 'auto',
  ...props
}: Props & PressableProps) {
  return (
    <PressableButton
      style={[styles.btn, {width: width, alignSelf}, style]}
      onPress={onPress}
      {...props}>
      <Text color="white">{children}</Text>
    </PressableButton>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR.primaryColor,
    padding: normalizeDimension(10),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
