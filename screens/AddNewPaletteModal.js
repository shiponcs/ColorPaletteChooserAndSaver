import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import ColorSwitch from '../components/ColorSwitch';
import { COLORS } from './resources';

const createAlert = (title, msg) => {
  Alert.alert(title, msg, [{ text: 'OK', onPress: () => {} }], {
    cancelable: false,
  });
};

const AddNewPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setselectedColors] = useState([]);

  const handleSelectedColorsUpdate = ({ item, isToBePushed }) => {
    setselectedColors((prev) => {
      if (isToBePushed) {
        prev.push(item);
        return prev;
      } else {
        const newState = prev.filter(
          ({ colorName }) => colorName !== item.colorName,
        );
        return newState;
      }
    });
  };

  const handleAddTheNewPalette = () => {
    if (paletteName === '') {
      createAlert('Empty palette name', 'Palette name is required!');
    } else if (selectedColors.length < 3) {
      createAlert(
        'Very few Colors choosen',
        'You must choose at least three colors',
      );
    } else {
      navigation.navigate('Home', { paletteName, colors: selectedColors });
    }
  };

  useEffect(() => {
    console.log('AddNewPalette mounted');
  }, []);

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Add a new Color Palette</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setPaletteName}
        value={paletteName}
        autoFocus={true}
        placeholder={'Palette Name'}
      />
      <FlatList
        style={styles.colorSwitchList}
        data={COLORS}
        keyExtractor={({ colorName }) => colorName}
        renderItem={({ item }) => (
          <ColorSwitch
            item={item}
            handleSelectedColorsUpdate={handleSelectedColorsUpdate}
          />
        )}
      />
      <Button title="Add the Palette" onPress={handleAddTheNewPalette} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 5,
    marginBottom: 120,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  colorSwitchList: {
    marginVertical: 10,
  },
});

export default AddNewPaletteModal;
