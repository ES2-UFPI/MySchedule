import React, { Component } from 'react';
import {
    View, 
    StatusBar,
    Image,
    StyleSheet,
    Text
} from 'react-native';

import BarraNavegacao from './BarraNavegacao';

export default class TelaDia extends Component {
  render() {
    return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <StatusBar
         backgroundColor = '#B9C941'
        />
        <BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='#B9C941'/>
        <Text>TelaDia</Text>
    </View>
    );
  }
}
