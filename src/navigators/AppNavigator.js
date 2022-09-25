import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Todo from '../containers/todo'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="todo" component={Todo} />
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
