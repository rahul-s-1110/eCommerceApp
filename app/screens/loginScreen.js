import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Octicons,
  Entypo,
} from "@expo/vector-icons";
import { colors, titles, btn1, hr80 } from "../global/style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { setUser } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

const LoginScreen = ({navigation}) => {

  const product = useSelector((state) => state.auth.auth)

  // useMemo(()=>{
  //   console.log("auth si ",product)
  // },[product])


  const dispatch = useDispatch();
  const [emailfocus, setEmailfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customError,setcustomError] = useState('');
  const [loading,setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        console.log("auth user available");
        navigation.navigate('home')
      }
    });
    return unsuscribe;
  }, []);

  const handlelogin = () => {
      signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            dispatch(setUser(user));
            navigation.replace('home')
        })
        .catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
            ) {
                setcustomError('Please enter a valid email address')
            }
            else {
                setcustomError('Incorrect email or password')
            }
        })
}

  return (
    <View style={styles.androidSafeArea}>
      <Text style={styles.head1}>Log In</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      <View style={styles.inputout}>
        <Entypo
          name="email"
          size={24}
          color={emailfocus === true ? colors.text1 : colors.text2}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onFocus={() => {
            setEmailfocus(true);
            setPasswordfocus(false);
            setShowpassword(false);
            setcustomError('')
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
            setcustomError("");
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
