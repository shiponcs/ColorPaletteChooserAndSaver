import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import ColorPalette from './screens/ColorPallete';
import AddNewPaletteModal from './screens/AddNewPaletteModal';
import Palette from './screens/Palette';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Main Window' }}
      />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.name })}
      />
      <MainStack.Screen
        name="Palette"
        component={Palette}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="AddNewPaletteModal"
          component={AddNewPaletteModal}
          options={{ title: 'Add a new Color Palette' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
