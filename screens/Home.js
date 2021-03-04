import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const solarizedColors = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const RAINBOW = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const FRONTEND_MASTERS = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const colorPalettes = [
  { paletteName: 'Solarized', colors: solarizedColors, key: '1' },
  { paletteName: 'Rainbow', colors: RAINBOW, key: '2' },
  { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS, key: '3' },
];

const Home = ({ navigation, route }) => {
  const [colorPalettesRemote, setColorPaletteRemote] = useState([]);
  const [isFetching, setIsFetchinng] = useState(true);

  const handleFetchColorPalette = useCallback(async () => {
    setIsFetchinng(true);
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (result.ok) {
      const colorPalettesResult = await result.json();

      setIsFetchinng(false);
      setColorPaletteRemote(colorPalettesResult);
    }
  }, []);

  const handleRefreshing = useCallback(async () => {
    setIsFetchinng(true);
    await handleFetchColorPalette();
    setIsFetchinng(false);
  }, []);

  useEffect(() => {
    handleFetchColorPalette();
  }, []);

  useEffect(() => {
    if (route.params?.paletteName)
      setColorPaletteRemote((prev) => {
        return [
          {
            paletteName: route.params.paletteName,
            colors: route.params.colors,
          },
          ...prev,
        ];
      });
  }, [route.params?.paletteName]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={colorPalettesRemote}
        keyExtractor={({ paletteName }) => paletteName}
        renderItem={({ item }) => (
          <PalettePreview
            handlePress={() => navigation.navigate('ColorPalette', item)}
            item={item}
          />
        )}
        refreshing={isFetching}
        onRefresh={handleRefreshing}
        ListHeaderComponent={
          <TouchableHighlight
            onPress={() => navigation.navigate('AddNewPaletteModal')}>
            <Text style={styles.addColor}>Add new Palette</Text>
          </TouchableHighlight>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  touchable: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'peru',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
