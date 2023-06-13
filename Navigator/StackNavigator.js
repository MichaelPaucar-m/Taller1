import { createStackNavigator } from '@react-navigation/stack';
import Juego from '../Screens/Juego';
import Login from '../Screens/Login';
import Registro from '../Screens/Registro';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator> 
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Juego" component={Juego} />
            

            <Stack.Screen name="Registro" component={Registro} />

        </Stack.Navigator>
    );
}

export default function StackNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}