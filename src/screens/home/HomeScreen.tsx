import {View, FlatList, StyleSheet, Switch} from 'react-native';
import React, {Fragment} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@store/store';
import {updateTodo} from '@store/state/todoSlice';
import HeaderComponent from '@components/home/HeaderComponent';
import Text from '@components/Text';
import PressableOpacity from '@components/PressableOpacity';
import {COLOR} from '@app/constant/color';
import {displayNotification} from '@app/lib/notification';
export default function HomeScreen() {
  const {todos} = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();
  const sendNotification = () => {
    const message = todos?.reduce((acc, item) => {
      if (item?.completed) {
        return acc + ' ' + item?.title;
      }
      return acc;
    }, '');

    displayNotification({message: message.trim()});
  };
  const sendScheduleNotification = () => {
    const message = todos?.reduce((acc, item) => {
      if (item?.completed) {
        return acc + ' ' + item?.title;
      }
      return acc;
    }, '');

    displayNotification({message: message.trim(), delay: 5});
  };
  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => {
          return (
            <View style={styles?.container}>
              <Text>{item.title}</Text>
              <Switch
                value={item?.completed}
                onValueChange={value => {
                  dispatch(
                    updateTodo({
                      ...item,
                      completed: value,
                    }),
                  );
                }}
              />
            </View>
          );
        }}
        ListFooterComponent={
          <Fragment>
            <PressableOpacity style={styles.btn} onPress={sendNotification}>
              <Text style={styles.btnText}>Trigger Notification</Text>
            </PressableOpacity>
            <PressableOpacity
              style={styles.btn}
              onPress={sendScheduleNotification}>
              <Text style={styles.btnText}>Schedule Notification 5sec</Text>
            </PressableOpacity>
          </Fragment>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 10,
    gap: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: COLOR.primaryColor,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: COLOR.white,
  },
});
