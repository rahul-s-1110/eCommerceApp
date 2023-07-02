import React from 'react';
import { View, Text } from 'react-native';
import DressItem from './dressItem';

const ProductListingComponent = ({ products }) => {
  return (
    <View>
      {products.map((item,index) => (
        <DressItem item={item} key={index} />
      ))}
    </View>
  );
};

export default ProductListingComponent;