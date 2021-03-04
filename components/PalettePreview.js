import React, { memo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const PalettePreview = ({ handlePress, item: colorItem }) => {
  return (
    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
      <Text style={styles.text}>{colorItem.paletteName}</Text>
      <FlatList
        horizontal={true}
        data={colorItem.colors.slice(0, 5)}
        keyExtractor={({ hexCode }) => hexCode}
        renderItem={({ item }) => (
          <View style={[styles.box, { backgroundColor: item.hexCode }]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  touchable: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'peru',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 30,
    height: 30,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default memo(PalettePreview);
