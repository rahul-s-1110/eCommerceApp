import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
// import DressItem from '../componnet/dressItem';
import { useDispatch, useSelector } from 'react-redux';
import {services} from '../../assets/staticData'
import { useNavigation } from "@react-navigation/native";
import DressItem from "../component/dressItem";
import { getProduct } from "../redux/productReducer";
import EcommerceApp from "../component/eCommerce";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart)
  const total = cart.map((item) => item.quantity).reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const product = useSelector((state) => state.product.product)
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProduct =  () => {
        services.map((service) => dispatch(getProduct(service)))
    }
    fetchProduct();
  }, []);

  return (
    <>
      <ScrollView style={styles.androidSafeArea}>
        <View style={styles.topbar}>
          <Pressable onPress={()=>navigation.navigate('profile')}>
            <FontAwesome5 name="user-tie" size={24} color="black" />
          </Pressable>
          <Pressable onPress={()=>navigation.navigate('cart')} style={{  marginRight: 8 }}>
            <Feather name="shopping-cart" size={24} color="#fd5c63" >
            <Text style={{color:"gray",fontSize:16}}>{total=== 0?null:total}</Text>
            </Feather>
          </Pressable>
        </View>
          <EcommerceApp products={product} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? 28 : 0,
    backgroundColor: "#f0f0f0",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default HomeScreen;
