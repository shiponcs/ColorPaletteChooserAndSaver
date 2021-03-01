import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = ({ colorName, hexCode, navigation }) => {
  const textColor = {
    color:
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1
        ? 'black'
        : 'white',
  };
  const border = {
    borderWidth: 2,
    borderColor: 'red',
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Palette', {
          hexCode: hexCode,
          name: `${colorName} Palette`,
        })
      }
      style={[styles.box, { backgroundColor: hexCode }, border]}>
      <Text style={textColor}>
        {colorName} {hexCode}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  text: {
    color: 'white',
  },
});

export default App;
