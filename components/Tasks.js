import { View, Text, Button } from 'react-native';

export default ({ taskName, taskDate, removeTask, id }) => {
  return (
    <View style={{ flex: 1, marginRight: 10 }}>
      <Text>이름: {taskName}</Text>
      <Text>날짜: {taskDate.toString()}}</Text>
      <Button
        title="태스크 완료"
        onPress={async () => await removeTask(id)}
      />
    </View>
  );
};
