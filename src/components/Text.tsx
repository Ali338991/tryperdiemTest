import React from 'react';
import {Text as NativeText, StyleSheet, TextProps} from 'react-native';

type Props = {
  size?: number;
};

export default function Text(props: TextProps & Props) {
  const {size = 18, style, children, ...restProps} = props;

  return (
    <NativeText
      {...restProps}
      style={StyleSheet.flatten([styles.text, {fontSize: size}, style])}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'PolySans',
  },
});
