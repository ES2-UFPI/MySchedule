/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Tela inicial do app. 

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Calendario from './src/components/Calendario';
import TelaDia from './src/screens/TelaDia';


export default class App extends Component{
  render() {
    return (
      <Navigator 
        initialRoute={{id: 'principal'}}
        renderScene={(route, navigator) => {
          switch (route.id) {
            case 'principal':
              return (<CenaPrincipal navigator={navigator}/>);
            case 'Calendario':
              return (<Calendario navigator={navigator}/>);
            case 'TelaDia':
              return (<TelaDia navigator={navigator}/>);
            default:
              return false;
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
