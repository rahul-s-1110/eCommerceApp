import React, { useState } from "react";
import { TextInput,StyleSheet,View } from "react-native";
import {Feather} from '@expo/vector-icons'


const SearchComponent = ({ products, updateFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    updateFilteredProducts(filteredProducts);
  };

  return (
    <View style={styles.searchBarView}>
      <TextInput placeholder="Search for Item or More" onChangeText={handleSearch}
      value={searchQuery} />
      <Feather name="search" size={24} color="#fd5c63" />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
    searchBarView: {
        margin: 10,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.8,
        borderColor: "#C0C0C0",
        borderRadius: 7,
      },
})

