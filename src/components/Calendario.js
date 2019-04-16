import React, { Component } from 'react';
import {
    View, 
    StatusBar,
    Image,
    StyleSheet,
    Text
} from 'react-native';

//import BarraNavegacao from './BarraNavegacao';

export default class Calendario extends Component {
  render() {
    return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <StatusBar
         backgroundColor = '#B9C941'
        />
        {/*<BarraNavegacao voltar navigator={this.props.navigator} corDeFundo='#B9C941'/>*/}
        <Text>Iup!!! Mas não usaremos essa navegação, ela está em desuso!!! Foi descontinuada, mas da pra testar nossas telas rs</Text>
    </View>
    );
  }
}

