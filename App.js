import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ko, registerTranslation } from 'react-native-paper-dates'

registerTranslation('ko', ko);

import Home from './components/Home';
import CheckTodo from './components/CheckTodo';
import LogoTitle from './components/LogoTitle';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home Screen',
            headerTitle: LogoTitle,
          }}
        />
        <Stack.Screen
          name="CheckTodo"
          component={CheckTodo}
          options={{
            title: 'CheckTodo Screen',
            headerTitle: 'TODO 확인 및 수정',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
