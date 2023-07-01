import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='signIn' screenOptions={{headerShown:false}}>
        <Stack.Screen name='logIn' component={LoginScreen} />
        <Stack.Screen name='signIn' component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation