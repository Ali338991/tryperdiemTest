import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleSheet,
  ViewStyle,
} from 'react-native'

type ButtonProps = {
  loading?: boolean
}
const PressableOpacity = ({
  loading = false,
  children,
  ...props
}: PressableProps & ButtonProps) => {
  const handlePressedStyles = ({ pressed }: PressableStateCallbackType) =>
    StyleSheet.compose(StyleSheet.flatten<ViewStyle>(props.style as ViewStyle), {
      opacity: props.disabled || loading ? 0.6 : pressed ? 0.5 : 1,
    })

  return (
    <Pressable {...props} style={handlePressedStyles}>
      {loading ? <ActivityIndicator color={'white'} /> : children}
    </Pressable>
  )
}

export default PressableOpacity
