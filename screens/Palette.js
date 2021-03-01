import React from 'react';
import { View } from 'react-native';

const Palette = ({ route }) => {
  console.log(route.params.hexCode, 'jadlsfkj');
  return (
    <View style={{ backgroundColor: route.params.hexCode, flex: 1 }}></View>
  );
};

export default Palette;
