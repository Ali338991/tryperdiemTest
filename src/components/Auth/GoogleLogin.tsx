import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import PressableOpacity from '@components/PressableOpacity';
import Text from '@components/Text';

import {GOOGLE_CLIENT_ID} from '@app/config';
import {COLOR} from '@app/constant/color';
import {loginAPi} from '@store/api/authApi';
import {login} from '@store/state/authSlice';
import {initilizeTodo} from '@store/state/todoSlice';
import {defaultTodoList} from '@app/constant';
import {StackNavigation} from '@app/types/navigation';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigation>();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const handleLogin = useCallback(async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const {idToken} = await GoogleSignin.signIn();
      const response = await loginAPi({
        token: String(idToken),
      });
      dispatch(login(response));
      dispatch(initilizeTodo(defaultTodoList));
      navigation.navigate('Home');
    } catch (err) {
      console.log('🚀 ~ handleLogin ~ err:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  return (
    <PressableOpacity
      style={styles.button}
      onPress={handleLogin}
      loading={loading}>
      <Image source={require('@assets/google.png')} />
      <Text style={styles.text}>Sign in with Google</Text>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    borderRadius: 20,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLOR.black,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default GoogleLogin;
