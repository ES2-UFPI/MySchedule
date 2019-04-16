import React, { Component } from 'react';
import {
    View, 
    StatusBar,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import BarraNavegacao from './BarraNavegacao';


export default class CenaPrincipal extends Component {
  render() {
    return (
    <View>
        <StatusBar
         backgroundColor = '#ccc'
        />
        <BarraNavegacao  />
        <View>
            

                <View>
                    <TouchableHighlight
                        onPress={() =>{
                            this.props.navigator.push({id: 'Calendario'});
                        }}
                    >
                        <Text>Calendario</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress={() =>{
                            this.props.navigator.push({id: 'TelaDia'});
                        }}
                    >
                    <Text>Dias</Text>
                    </TouchableHighlight>
                </View>
            </View>   
      </View>
    );
  }
}
