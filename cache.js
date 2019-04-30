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

  Cache = require("cache");
  c = new Cache(10 * 1000); 

  teste(){
       // Cache de 10 segundos.
    Cache = require("cache");
    c = new Cache(10 * 1000); 
     

    c.put('ui', val);      // put it in the cache.
                          // Optional 3rd arg is TTL for just this
                // key, e.g.;  c.put(key, val, 5 * 1000);
    c.get(key);           // "something" (less than 10 secs have passed)
    alert(c.get(key));
    
    setTimeout(function() {alert(c.get('ui'));}, 11 * 1000);
  }

  rec() {
    c.get('ui');
    alert(c.get('ui'));
  }
}