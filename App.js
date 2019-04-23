import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/components/dias';
import Semanas from './src/components/semanas';

const navigator = createStackNavigator({
  home: Dias,
  calendario: Calendario,
  semanas: Semanas 
})
const App = createAppContainer(navigator);

export default App;

