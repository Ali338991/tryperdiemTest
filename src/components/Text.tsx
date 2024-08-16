import React from 'react';
import {Text as NativeText, StyleSheet, TextProps} from 'react-native';

export default function Text(props: TextProps) {
  return (
    <NativeText
      {...props}
      style={StyleSheet.flatten([styles.text, props.style])}>
      {props.children}
    </NativeText>
  );
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PolySans',
    lineHeight: 16 * 1.5,
  },
});
