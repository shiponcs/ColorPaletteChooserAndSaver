import React, { memo, useState } from 'react';
import { View, Switch, Text } from 'react-native';

const ColorSwitch = ({ item, handleSelectedColorsUpdate }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { colorName, hexCode } = item;

  const handleValueChange = () => {
    setIsSelected((prev) => {
      if (!prev) {
        // means the color is to be pushed
        handleSelectedColorsUpdate({ item, isToBePushed: true });
      } else {
        // undo the push
        handleSelectedColorsUpdate({ item, isToBePushed: false });
      }
      return !prev;
    });
  };

  return (
    <View>
      <Text>{colorName}</Text>
      <Switch value={isSelected} onValueChange={handleValueChange} />
    </View>
  );
};

export default memo(ColorSwitch);
