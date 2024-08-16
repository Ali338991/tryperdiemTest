import {StyleSheet, View} from 'react-native';
import React from 'react';
import PressableOpacity from '@components/PressableOpacity';
import {useAppDispatch, useAppSelector} from '@store/store';
import {logout} from '@store/state/authSlice';
import {COLOR} from '@app/constant/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '@components/Text';

export default function Setting() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listItem}>
        <Text>Name</Text>
        <Text>{user?.name}</Text>
      </View>
      <View>
        <Text>email</Text>
        <Text>{user?.email}</Text>
      </View>
      <PressableOpacity onPress={() => dispatch(logout())} style={styles.btn}>
        <Text style={styles.btnText}>Logout</Text>
      </PressableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    color: COLOR.white,
  },
});
