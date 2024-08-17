import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import Text from '@components/Text';
import {GOOGLE_CLIENT_ID} from '@app/config';
import {COLOR} from '@app/constant/color';
import {loginAPi} from '@store/api/authApi';
import {login} from '@store/state/authSlice';
import {initilizeTodo} from '@store/state/todoSlice';
import {defaultTodoList} from '@app/constant';
import {StackNavigation} from '@app/types/navigation';
import {hp, normalizeDimension} from '@app/util/design';
import PressableOpacity from '@components/PressableOpacity';

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigation>();
  const [loading, setLoading] = useState(false);

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
      const response = await loginAPi({token: String(idToken)});
      dispatch(login(response));
      dispatch(initilizeTodo(defaultTodoList));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation]);

  return (
    <PressableOpacity
      style={styles.button}
      onPress={handleLogin}
      loadingColor={'black'}
      loading={loading}>
      <Image source={require('@assets/google.png')} />
      <Text>Sign in with Google</Text>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp(48),
    width: '100%',
    borderRadius: 20,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalizeDimension(5),
  },
  icon: {
    width: normalizeDimension(24),
    height: normalizeDimension(24),
  },
});

export default GoogleLogin;
