import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import { colors, titles, btn1, hr80 } from "../global/style";

const LoginScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = () => {
    console.log("btn");
  };

  return (
    <View style={styles.androidSafeArea}>
      <Text style={styles.head1}>Log In</Text>
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowpassword(false);
            // setcustomError('')
          }}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputout}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={24}
          color={passwordfocus == true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onFocus={() => {
            setEmailfocus(false);
            setPasswordfocus(true);
            // setcustomError("");
          }}
          secureTextEntry={showpassword === false ? true : false}
          onChangeText={(text) => setPassword(text)}
        />
        <Octicons
          name={showpassword == false ? "eye-closed" : "eye"}
          size={24}
          color="black"
          onPress={() => setShowpassword(!showpassword)}
        />
      </View>

      <TouchableOpacity style={btn1} onPress={() => handlelogin()}>
        <Text
          style={{
            color: colors.col1,
            fontSize: titles.btntxt,
            fontWeight: "bold",
          }}
        >
          Log In
        </Text>
      </TouchableOpacity>
      <View style={hr80}></View>
      <Text>
        Already have an account?
        <Text
          style={styles.signup}
        onPress={() => navigation.navigate("signIn")}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 28 : 0,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "80%",
    height: 200,
    backgroundColor: "red",
  },
  inputout: {
    flexDirection: "row",
    width: "80%",
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 20,
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "80%",
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  signup: {
    color: colors.text1,
  },
});
