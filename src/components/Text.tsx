import {fetchFontFamily, scaleFontSize} from '@app/util/design';
import React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  TextProps,
  TextStyle,
} from 'react-native';

type Props = {
  size?: number;
  weight?: TextStyle['fontWeight'];
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

export default function Text(props: TextProps & Props) {
  const {
    size = 18,
    weight = '400',
    color = 'black',
    align = 'auto',
    style,
    children,
    ...restProps
  } = props;
  const defaultStyle: TextStyle = {
    includeFontPadding: false,
    fontSize: scaleFontSize(size),
    fontFamily: fetchFontFamily(size),
    textAlign: align,
    fontWeight: weight,
    color: color,
  };
  return (
    <NativeText
      {...restProps}
      style={StyleSheet.flatten([style, defaultStyle])}>
      {children}
    </NativeText>
  );
}
