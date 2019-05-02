import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';


export default class Cache extends Component {
  render() {
    return (
      <View> 
        <TouchableOpacity onPress={this.teste}>
          <Text>Salvar</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={this.rec}>
          <Text>Amostrar</Text>
        </TouchableOpacity> 
      </View>
    );
  }

  

  teste(){
       // Cria uma cache com 10 segundos de duração
    Cache = require("cache");
    c = new Cache(20 * 1000); 
    
       //Json que tu quer salvar :).
    var obj = {
     name: 'Eu aee',
     email: 'euAee@gemail.com',
     city: 'Timon kkk'
    }
    c.put('ui', JSON.stringify(obj));      //aqui tu salva o json, pode até colocar o tempo que tu quer (chave, objeto, tempo)  c.put(key, val, 5 * 1000);
    // aqui se tu quiser ver como fica o após 10 segundos, fica nulo, triste!
    // 11 seconds later ...
  }

  rec() {
  	//aqui recupera
    var user = c.get('ui');
    var parsed = JSON.parse(user);
  	alert(parsed.name);
  }

 }