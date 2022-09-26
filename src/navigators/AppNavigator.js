import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Todo from '../containers/todo'
import Auth from '../containers/auth'
import SCREENS from '../constants/NavigationRoutes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled:false }}>
                    <Stack.Screen name={SCREENS.auth} component={Auth} />
                    <Stack.Screen name={SCREENS.todo} component={Todo} />
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;
