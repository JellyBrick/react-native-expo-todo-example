import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { firestore } from '../FirebaseConfig';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

export default (props) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showData, setShowData] = useState(false);

  const addToFirestore = async () => {
    try {
      firestore.collection('todo').doc().set({
        Task: task,
        Date: date,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginBottom: 100,
        }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Button
            title="날짜 선택"
            onPress={() => setShowDatePicker(!showDatePicker)}
          />
        </View>
        {showDatePicker && (
          <DatePickerModal
            locale="ko"
            mode="single"
            visible={true}
            onDismiss={() => {
              setShowDatePicker(false);
              setDate(new Date());
            }}
            date={date}
            onConfirm={(params) => {
              setShowDatePicker(false);
              setDate(params.date);
              setShowTimePicker(true);
            }}
          />
        )}
        {showTimePicker && (
          <TimePickerModal
            visible={true}
            onDismiss={() => {
              setShowTimePicker(false);
              setDate(new Date());
            }}
            onConfirm={({ hours, minutes }) => {
              setShowTimePicker(false);
              const tempDate = date;
              tempDate.setHours(hours);
              tempDate.setMinutes(minutes);
              setDate(tempDate);
            }}
            hours={12}
            minutes={14}
          />
        )}

        <TextInput
          placeholder="태스크 입력"
          onChangeText={(newTask) => {
            setTask(newTask);
            setShowData(false);
          }}
          defaultValue={task}
          style={{ flex: 1, marginRight: 10 }}
        />
        <Button
          title="추가"
          onPress={() => {
            addToFirestore();
            setShowData(true);
          }}
        />
      </View>
      {showData && (
        <View>
          <Text>태스크 추가 완료 됨:</Text>
          <Text>날짜: {date.toString()}</Text>
          <Text>태스크: {task}</Text>
        </View>
      )}
      <View>
        <Button
          title="태스크 전체 조회 및 수정"
          onPress={async () => {
            const getFromFirestore = async () => {
              const document = await firestore.collection('todo').get();
              const arr = [];

              document.forEach((it) => {
                arr.push({ ...it.data(), id: it.id });
              });
              return arr;
            };
            props.navigation.navigate('CheckTodo', {
              data: await getFromFirestore(),
            });
          }}
        />
      </View>
    </View>
  );
};
