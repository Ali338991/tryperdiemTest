import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  loading?: boolean;
  loadingColor?: string;
};

const PressableButton: React.FC<PressableProps & ButtonProps> = ({
  loading = false,
  loadingColor = 'white',
  children,
  style,
  disabled,
  ...props
}) => {
  const handlePressedStyles = ({ pressed }: { pressed: boolean }): ViewStyle =>
    ({
      opacity: disabled || loading ? 0.6 : pressed ? 0.5 : 1,
      ...(style as ViewStyle),
    });
  return (
    <Pressable {...props} disabled={disabled || loading} style={handlePressedStyles}>
      {loading ? (
        <ActivityIndicator color={loadingColor} size={25} />
      ) : (
        children
      )}
    </Pressable>
  );
};

export default PressableButton;
