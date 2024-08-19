import {StackScreen} from '@app/types/navigation';
import GoogleLogin from '@components/Auth/GoogleLogin';
import {useAppDispatch} from '@store/store';
import React, {useState} from 'react';
import {View, StyleSheet, Alert, Image} from 'react-native';
import {login} from '@redux/state/authSlice';
import {initilizeTodo} from '@store/state/todoSlice';
import {defaultTodoList} from '@app/constant';
import {loginAPi} from '@store/api/authApi';
import Button from '@components/Button';
import TextInput from '@components/TextInput';
import Text from '@components/Text';
export default function LoginScreen({navigation}: StackScreen<'Login'>) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
        label="User name"
        placeholder="User name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button onPress={handleLogin} loading={loader}>
        Sign In
      </Button>
      <Text size={18} align="center">
        OR
      </Text>
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
});
