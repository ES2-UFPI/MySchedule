import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/components/dias';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'


const navigator = createStackNavigator({
  home: CadastroAtividade,
  calendario: Calendario,
  semanas: Semanas,
  dias: Dias
  
})
const App = createAppContainer(navigator);

export default App;

