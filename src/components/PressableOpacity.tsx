import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  loading?: boolean;
  loadingColor?: string;
};
const PressableOpacity = ({
  loading = false,
  loadingColor = 'white',
  children,
  ...props
}: PressableProps & ButtonProps) => {
  const handlePressedStyles = ({pressed}: PressableStateCallbackType) =>
    StyleSheet.compose(
      StyleSheet.flatten<ViewStyle>(props.style as ViewStyle),
      {
        opacity: props.disabled || loading ? 0.6 : pressed ? 0.5 : 1,
      },
    );

  return (
    <Pressable {...props} style={handlePressedStyles}>
      {loading ? (
        <ActivityIndicator color={loadingColor} size={25} />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default PressableOpacity;
