import { StyleSheet } from "react-native";
import NavigationScreen from "./app/navigation/navigationScreen";
import { Provider } from "react-redux";
import { persistor,store } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationScreen />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
