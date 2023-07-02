import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { clearUser } from '../redux/authReducer';
import { useDispatch } from 'react-redux';
import { cleanCart } from '../redux/cartReducer';

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const signOutUser = () =>{
        signOut(auth).then(()=>{
            dispatch(cleanCart());
            dispatch(clearUser());
            navigation.replace('logIn')
        }).catch((err)=>{
            console.log("error in logout is ",err)
        })
    }
 
  return (
    <SafeAreaView style={[styles.androidSafeArea,{justifyContent:
    "center",alignItems:"center"}]}>
        <Pressable style={{marginVertical:10}}>
            <Text>Hello </Text>
        </Pressable>
        <Pressable onPress={signOutUser}>
            <Text>Sign Out</Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    androidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 28 : 0,
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingHorizontal: Platform.OS === 'android' ? 5 : 0
    },
})