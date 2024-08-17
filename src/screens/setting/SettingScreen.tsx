import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@store/store';
import {logout} from '@store/state/authSlice';
import {COLOR} from '@app/constant/color';
import Text from '@components/Text';
import Button from '@components/Button';
import {commonStyle} from '@app/constant/commonStyle';
import {normalizeDimension} from '@app/util/design';

export default function SettingScreen() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <Text align="center" weight="600" size={30}>
        Information
      </Text>
      <View style={commonStyle.between}>
        <Text weight="600">Name</Text>
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.listItem}>
        <Text weight="600">Email</Text>
        <Text>{user?.email}</Text>
      </View>
      <Button onPress={() => dispatch(logout())} style={styles.btn}>
        Logout
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeDimension(10),
    paddingVertical: normalizeDimension(20),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalizeDimension(5),
  },
  btn: {
    backgroundColor: COLOR.danger,
    marginTop: normalizeDimension(20),
  },
});
