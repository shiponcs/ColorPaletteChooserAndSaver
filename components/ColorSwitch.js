import React, { memo, useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const ColorSwitch = ({ item, handleSelectedColorsUpdate }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { colorName, hexCode } = item;

  const handleValueChange = (changedValue) => {
    handleSelectedColorsUpdate({ item, isToBePushed: changedValue });
    setIsSelected(changedValue);
  };

  return (
    <View style={styles.colorSwitch}>
      <Text style={styles.text}>{colorName}</Text>
      <Switch
        thumbColor={hexCode}
        trackColor={'black'}
        value={isSelected}
        onValueChange={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  colorSwitch: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    fontSize: 15,
  },
});

export default memo(ColorSwitch);
