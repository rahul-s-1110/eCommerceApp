import React, { useState } from 'react';
import ProductListingComponent from './productListComp';
import SearchComponent from './searchComp';
import { View } from 'react-native';

const EcommerceApp = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const updateFilteredProducts = (filtered) => {
    setFilteredProducts(filtered);
  };

  return (
    <View>
      <SearchComponent
        products={products}
        updateFilteredProducts={updateFilteredProducts}
      />
      <ProductListingComponent products={filteredProducts} />
    </View>
  );
};

export default EcommerceApp;
