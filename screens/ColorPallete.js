import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ColorBox from '../components/ColorBox';

const ColorPalette = ({ navigation, route }) => {
  return (
    <FlatList
      style={[styles.container]}
      data={route.params.colors}
      keyExtractor={({ hexCode }) => hexCode}
      renderItem={({ item }) => (
        <ColorBox
          colorName={item.colorName}
          hexCode={item.hexCode}
          navigation={navigation}
        />
      )}
      ListHeaderComponent={
        <Text style={styles.heading}>
          Here are some boxes with different colors
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default ColorPalette;
