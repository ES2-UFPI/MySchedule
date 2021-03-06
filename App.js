import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerNavigator } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/screens/TelaExibicaoDia';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'
import ListaAtividade from './src/components/ListaAtividades'
import Login from './src/screens/TelaLogin'


const navigator = createDrawerNavigator({
  home: {
    screen: createStackNavigator({
      screen: ListaAtividade,
      cadastroDeAtividade: CadastroAtividade
    }),
    navigationOptions: {
      title: 'Lista de Atividades'
    },
  },
  lista: {
    screen: createStackNavigator({
      screen: Dias,
      cadastroDeAtividade: CadastroAtividade
    }),
    navigationOptions: {
      title: 'Atividades do dia'
    },
  },
  login: Login
})
const App = createAppContainer(navigator);

export default App;