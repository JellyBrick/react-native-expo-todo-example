import { useState } from 'react';
import { View } from 'react-native';
import { firestore } from '../FirebaseConfig';
import Tasks from './Tasks';

export default (props) => {
  const { data } = props.route.params;
  const [task, setTask] = useState(data);

  return (
    <View>
      {task.map((it, index) => (
        <Tasks
          taskName={it.Task}
          taskDate={new Date(it.Date.seconds * 1000)}
          taskState={it.taskState}
          setTaskState={it.setTaskState}
          removeTask={async (id) => {
            const tempArr = [...task];
            const removedItem = tempArr.splice(id, 1)[0];
            await firestore.collection('todo').doc(removedItem.id).delete();
            setTask(tempArr);
          }}
          id={index}
        />
      ))}
    </View>
  );
};
