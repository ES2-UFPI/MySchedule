import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer, createDrawerNavigator,DrawerNavigator } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/components/dias';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'
import ListaAtividade from './src/components/ListaAtividades'

/*
const Routes = createAppContainer(
  createDrawerNavigator({
    Home: ListaAtividade,
    About: Dias,
  })
);

export default Routes;
*/


/*

const Drawer = DrawerNavigator({
  HomeDrawer: {
    screen: ListaAtividade
  },
  SettingsDrawer:{
    screen: Dias
  }
});
const App = StackNavigator({
  Drawer: {
    screen: Drawer,
  },
  Home: {
    screen: ListaAtividade
  },
  Settings: {
    screen: Dias
  },
  View: { screen: ListaAtividade},
})

export default App;

*/








const navigator = createDrawerNavigator({
  home: ListaAtividade,
  calendario: Calendario,
  semanas: Semanas,
  dias: Dias,
  atividades: ListaAtividade,
  cadastroDeAtividade: CadastroAtividade
  
})
const App = createAppContainer(navigator);

export default App;
