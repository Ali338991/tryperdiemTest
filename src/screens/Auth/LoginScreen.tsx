import {StackScreen} from '@app/types/navigation';
import GoogleLogin from '@components/Auth/GoogleLogin';
import PressableOpacity from '@components/PressableOpacity';
import {useAppDispatch} from '@store/store';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View, TextInput, Text, StyleSheet, Alert, Image} from 'react-native';
import {login} from '@redux/state/authSlice';
import {initilizeTodo} from '@store/state/todoSlice';
import {defaultTodoList} from '@app/constant';
import {loginAPi} from '@store/api/authApi';
import Button from '@components/Button';
export default function LoginScreen({navigation}: StackScreen<'Login'>) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setloader] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    if (!userName) {
      return Alert.alert('username missing');
    }
    if (!password) {
      return Alert.alert('password missing');
    }
    setloader(true);
    const response = await loginAPi({
      userName,
      password,
    });

    if (response?.status !== 200) {
      setloader(false);
      return Alert.alert(response?.message);
    }
    setloader(false);
    dispatch(login(response));
    dispatch(initilizeTodo(defaultTodoList));
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={userName}
        onChangeText={setUserName}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Icon
          name={showPassword ? 'eye-off' : 'eye'}
          style={styles.showHideBtn}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View>
        <Button onPress={handleLogin} loading={loader}>
          Sign In
        </Button>
      </View>
      <Text style={styles.orText}>OR</Text>
      <GoogleLogin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  showHideBtn: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  showHideText: {
    color: '#1E90FF',
    marginLeft: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
  },
});
