import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@store/store';
import PressableOpacity from '@components/PressableOpacity';
import {COLOR} from '@app/constant/color';
import DateTimePiker from '@react-native-community/datetimepicker';
import {addItemInList, removeItemInList} from '@store/state/todoSlice';
import {List} from '@app/types/todo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '@components/Text';
import Button from '@components/Button';

export default function HeaderComponent() {
  const [openModal, setOpenModal] = useState(false);
  const {list} = useAppSelector(state => state.todo);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [showPiker, setShowPiker] = useState(false);
  const dispatch = useAppDispatch();
  const handlesave = () => {
    const data: List = {
      date: date.toISOString(),
      title,
      id: Math.random(),
    };
    dispatch(addItemInList(data));
    setOpenModal(false);
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <PressableOpacity
            style={styles.btn}
            onPress={() => {
              setTitle('');
              setShowPiker(Platform.OS === 'ios');
              setOpenModal(true);
            }}>
            <Text style={styles.btnText}>Add</Text>
          </PressableOpacity>
        }
        data={list}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles?.container}>
              <Text>{item.title}</Text>
              <Icon
                name={'delete'}
                color={'red'}
                size={30}
                onPress={() => dispatch(removeItemInList(item?.id))}
              />
            </View>
          );
        }}
        ListFooterComponent={
          <Text size={30} style={styles.todoTitle}>
            Todo List
          </Text>
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.todoTitle}>Add Entry</Text>
            <TextInput
              style={styles.input}
              placeholder="add title"
              value={title}
              onChangeText={setTitle}
            />
            {Platform.OS === 'android' && (
              <Button width={100} onPress={() => setShowPiker(true)}>
                selet date
              </Button>
            )}
            {showPiker && (
              <DateTimePiker
                value={date}
                mode="date"
                style={styles.datePiker}
                onChange={(event, value) => {
                  if (
                    (event.type === 'dismissed' || event.type === 'set') &&
                    Platform.OS === 'android'
                  ) {
                    setShowPiker(false);
                  }
                  if (value) {
                    setDate(value);
                  }
                }}
              />
            )}
            <PressableOpacity
              style={styles.btn}
              disabled={!date || !title}
              onPress={handlesave}>
              <Text style={styles.btnText}>Save</Text>
            </PressableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLOR.primaryColor,
    padding: 10,
    borderRadius: 10,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
  btnText: {
    color: COLOR.white,
  },
  todoTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    gap: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  datePiker: {
    alignSelf: 'flex-start',
  },
});
