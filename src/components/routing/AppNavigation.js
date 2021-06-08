import 'react-native-gesture-handler';
import React from 'react';
import Home from '../AuthScreen/Home'
import DisplayRealm from '../AuthScreen/DisplayRealm';
import Delete from '../AuthScreen/Delete';
import FirstAnimation from '../AuthScreen/FirstAnimation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={FirstAnimation}>
                <Stack.Screen name="FirstAnimation" component={FirstAnimation} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="DisplayRealm" component={DisplayRealm} />
                <Stack.Screen name="Delete" component={Delete} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}


export default AppNavigation;
