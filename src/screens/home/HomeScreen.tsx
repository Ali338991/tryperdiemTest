import {View, FlatList, StyleSheet, Switch} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '@store/store';
import {updateTodo} from '@store/state/todoSlice';
import ListComponent from '@components/home/ListComponent';
import Text from '@components/Text';
import {displayNotification, scheduleNotification} from '@app/lib/notification';
import {normalizeDimension} from '@app/util/design';
import Button from '@components/Button';
import {commonStyle} from '@app/constant/commonStyle';
import {getMessage} from '@app/util';
import {Todo} from '@app/types/todo';

export default function HomeScreen() {
  const {todos} = useAppSelector(state => state.todo);
  const dispatch = useAppDispatch();

  const handleNotification = () => {
    displayNotification({message: getMessage(todos)});
  };

  const handleScheduledNotification = () => {
    scheduleNotification({message: getMessage(todos), delay: 5});
  };

  const handleSwitchChange = (item: Todo, value: boolean) => {
    dispatch(
      updateTodo({
        ...item,
        completed: value,
      }),
    );
  };

  const renderItem = ({item}: {item: Todo}) => (
    <View style={commonStyle.between}>
      <Text>{item.title}</Text>
      <Switch
        value={item.completed}
        onValueChange={value => handleSwitchChange(item, value)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListComponent}
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.bottomContainer}>
            <Button onPress={handleNotification}>Trigger Notification</Button>
            <Button onPress={handleScheduledNotification}>
              Schedule Notification 5 sec
            </Button>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: normalizeDimension(10),
    gap: normalizeDimension(7),
  },
  bottomContainer: {
    gap: normalizeDimension(7),
  },
});
