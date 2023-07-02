import react from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/loginScreen";
import SignupScreen from "../screens/signupScreen";
import HomeScreen from "../screens/homeScreen";
import CartScreen from "../screens/cartScreen";
import ProfileScreen from "../screens/profile";


const Stack = createStackNavigator();

const NavigationScreen = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="logIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="logIn" component={LoginScreen} />
          <Stack.Screen name="signIn" component={SignupScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="cart" component={CartScreen} />
          <Stack.Screen name="profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default NavigationScreen;
