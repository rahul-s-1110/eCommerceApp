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
  Octicons,Entypo ,
  AntDesign,
} from "@expo/vector-icons";
import { colors, titles, btn1, hr80 } from "../global/style";
import {auth,db} from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = ({navigation}) => {
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [nameFocus, setNameFocus] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [customError, setCustomError] = useState('');
  const [successMsg,setSuccessmsg] = useState(null);

  const handlelogin = () => {
    setSuccessmsg(null)
    try {
      createUserWithEmailAndPassword(auth,email, password)
          .then((userCredentials) => {
              setSuccessmsg("User Created SuccessFull")
              var user = userCredentials.user;
              dispatch(setUser(user));
              navigation.replace('home');
          })
          .catch((error) => {
              console.log('sign up firebase error ', error.message)
              if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
                  setCustomError('Email already exists')
              }
              else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
                  setCustomError('Invalid Email')
              }
              else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                  setCustomError('Password should be at least 6 characters')
              }
              else {
                  setCustomError(error.message)
              }
          })
  }
  catch (error) {
      console.log('sign up system error ', error.message)
  }
  };

  return (
    <View style={styles.androidSafeArea}>
      <Text style={styles.head1}>Sign Up</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      <View style={styles.inputout}>
        <AntDesign
          name="user"
          size={24}
          color={nameFocus == true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onFocus={() => {
            setNameFocus(true);
            setEmailfocus(false);
            setPasswordfocus(false);
            setCustomError("");
          }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.inputout}>
        <Entypo
          name="email"
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
            setNameFocus(false);
            setCustomError('')
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
            setNameFocus(false);
            setCustomError("");
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
          Sign Up
        </Text>
      </TouchableOpacity>
      <View style={hr80}></View>
      <Text>
        Already have an account?
        <Text
          style={styles.signup}
        onPress={() => navigation.navigate("logIn")}
        >
          {" "}
          Log In
        </Text>
      </Text>
      {successMsg == null?null:<Text>{successMsg}</Text>}
    </View>
  );
};

export default SignupScreen;

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
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
},
});
