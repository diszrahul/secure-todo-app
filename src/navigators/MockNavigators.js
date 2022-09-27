import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MockedNavigator = ({component, params = {}}) => {
    return (
        <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled:false }}>
                <Stack.Screen
                    name="MockedScreen"
                    component={component}
                    initialParams={params}
                    />
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MockedNavigator;
