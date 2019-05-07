import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/components/dias';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'
import ListaAtividade from './src/components/ListaAtividades'


const navigator = createStackNavigator({
  home: CadastroAtividade,
  calendario: Calendario,
  semanas: Semanas,
  dias: Dias,
  atividades: ListaAtividade
  
})
const App = createAppContainer(navigator);

export default App;

