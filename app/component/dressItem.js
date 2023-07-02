import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartReducer";
import { decrementQty, incremetQty } from "../redux/productReducer";

const DressItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item)); //for cart
    dispatch(incremetQty(item)); //for product
  };

  return (
    <View>
      <Pressable
        style={styles.mainBtn}
      >
        <View>
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View>
          <Text
            style={{
              width: 83,
              fontSize: 17,
              fontWeight: "700",
              marginBottom: 5,
            }}
          >
            {item.name}
          </Text>
          <Text style={{ width: 60, color: "gray", fontSize: 15 }}>
            ${item.price}
          </Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
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
              style={styles.btn}
            >
              <Text style={styles.cartQtyTxt}>-</Text>
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
              style={styles.btn}
            >
              <Text
                style={styles.cartQtyTxt}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.addBtnTxt}>Add</Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({
  btn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  addBtnTxt: {
    borderColor: "gray",
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088F8F",
    textAlign: "center",
    padding: 5,
    borderRadius: 3.5,
    fontSize: 17,
    fontWeight: "bold",
  },
  cartQtyTxt: {
    fontSize: 20,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
    textAlign: "center",
  },
  mainBtn:{
    backgroundColor: "#f8f8f8",
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 14,
  }
});
