import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer, createDrawerNavigator,DrawerNavigator } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/components/dias';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'
import ListaAtividade from './src/components/ListaAtividades'
import Login from './src/components/login'


const navigator = createDrawerNavigator({
  home: ListaAtividade,
  dias: Dias,
  calendario: Calendario,
  semanas: Semanas,
  cadastroDeAtividade: CadastroAtividade,
  login: Login
})
const App = createAppContainer(navigator);

export default App;
