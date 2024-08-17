import {
  StyleSheet,
  TextInput as NativeInput,
  TextInputProps,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {COLOR} from '@app/constant/color';
import {CustomTextInputProps} from '@app/types/textInput';
import {hp, normalizeDimension, generateTextStyle} from '@app/util/design';
import Text from './Text';

const TextInput = ({
  placeholder,
  label = '',
  value,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  ...rest
}: TextInputProps & CustomTextInputProps) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  return (
    <View>
      <Text numberOfLines={1}>{label}</Text>
      <View style={styles.inputContainer}>
        <NativeInput
          value={value}
          autoCapitalize="none"
          placeholder={placeholder}
          style={styles.inputStyle}
          onChangeText={onChangeText}
          secureTextEntry={showPassword}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={COLOR.borderGrey}
          {...rest}
        />
        {secureTextEntry && (
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            style={styles.showHideBtn}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: hp(45),
    borderRadius: 10,
    marginTop: normalizeDimension(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalizeDimension(10),
    borderWidth: 1,
    borderColor: COLOR.borderGrey,
  },
  inputStyle: {
    flex: 1,
    padding: 0,
    ...generateTextStyle(400, 16, COLOR.black),
  },
  showHideBtn: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});

export default TextInput;
