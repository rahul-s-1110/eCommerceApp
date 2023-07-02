import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable } from "react-native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartReducer";
import { decrementQty, incremetQty } from "../redux/productReducer";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <ScrollView style={styles.androidSafeArea}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
            color="black"
          />
          <Text>Your Bucket</Text>
        </View>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Your Cart is Empty</Text>
          </View>
        ) : (
          <>
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginHorizontal: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 12,
                  }}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "600" }}>
                    {item.name}
                  </Text>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQty(item)); //product
                        dispatch(decrementQuantity(item)); //cart
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        borderColor: "#BEBEBE",
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#088F8F",
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item));
                        dispatch(incremetQty(item));
                      }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        borderColor: "#BEBEBE",
                        backgroundColor: "#E0E0E0",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? 28 : 0,
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingHorizontal: Platform.OS === "android" ? 5 : 0,
  },
});
