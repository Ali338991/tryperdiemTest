import {View, StyleSheet, FlatList, Modal} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@store/store';
import {COLOR} from '@app/constant/color';
import {addItemInList, removeItemInList} from '@store/state/todoSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '@components/Text';
import Button from '@components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {commonStyle} from '@app/constant/commonStyle';
import TextInput from '@components/TextInput';
import PressableOpacity from '@components/PressableOpacity';
import {formatDateTime} from '@app/util';
import {List} from '@app/types/todo';
import {normalizeDimension} from '@app/util/design';

export default function ListComponent() {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useAppDispatch();
  const {list} = useAppSelector(state => state.todo);

  const handleSave = () => {
    if (title.trim()) {
      const data: List = {
        date: date.toISOString(),
        title,
        id: Date.now(),
      };
      dispatch(addItemInList(data));
      setOpenModal(false);
      setTitle('');
    }
  };

  const openDatePicker = () => setShowPicker(true);
  const closeDatePicker = () => setShowPicker(false);

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <Button
            alignSelf="flex-end"
            width={70}
            onPress={() => setOpenModal(true)}>
            Add
          </Button>
        }
        data={list}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => (
          <View style={commonStyle.between}>
            <View style={styles.listItem}>
              <Text weight={'600'}>{item.title}</Text>
              <Text size={16}>{formatDateTime(item.date)}</Text>
            </View>
            <Icon
              name="delete"
              color={COLOR.danger}
              size={30}
              onPress={() => dispatch(removeItemInList(item.id))}
            />
          </View>
        )}
        ListFooterComponent={
          <Text
            align="center"
            weight={600}
            size={30}
            style={styles.tagListTitle}>
            Todo List
          </Text>
        }
      />
      <Modal
        animationType="slide"
        transparent
        visible={openModal}
        onRequestClose={() => setOpenModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text align="center" weight={600} size={30}>
              Add Entry
            </Text>
            <TextInput
              label="Title"
              placeholder="Add title"
              value={title}
              onChangeText={setTitle}
            />
            <PressableOpacity onPress={openDatePicker}>
              <TextInput
                label="Date/time"
                pointerEvents="none"
                editable={false}
                value={formatDateTime(date)}
              />
            </PressableOpacity>
            {showPicker && (
              <DateTimePickerModal
                isVisible={showPicker}
                mode="datetime"
                onConfirm={value => {
                  setDate(value);
                  closeDatePicker();
                }}
                onCancel={closeDatePicker}
              />
            )}
            <Button
              alignSelf="flex-end"
              width={90}
              disabled={!title}
              onPress={handleSave}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 10,
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
    padding: 15,
    gap: 10,
  },
  listItem: {
    gap: 3,
  },
  tagListTitle: {
    marginVertical: normalizeDimension(10),
  },
});
