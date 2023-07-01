import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationScreen from './app/navigation/navigationScreen';
import LoginScreen from './app/screens/loginScreen';

export default function App() {
  return (
    // <View style={{flex:1}}  >
    //   <LoginScreen />
    // </View>
    <NavigationScreen />
  );
}

const styles = StyleSheet.create({
});
