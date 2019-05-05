import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class Atividade extends Component {

  render() {
    return (
      <View style={styles.item}>

    

        <View style={styles.detalhesItem}>
          <Text style={styles.txtTitulo}>{this.props.atividade.nome}</Text>
          <Text style={styles.txtValor}>Dia{this.props.atividade.dia}</Text>
          <Text style={styles.txtDetalhes}>Hora: {this.props.atividade.hora}</Text>
          <Text style={styles.txtDetalhes}>Descricao: {this.props.atividade.descricao}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#999',
    margin: 10,
    padding: 10,
    flexDirection: 'row'
  },
  foto: {
    width: 102,
    height: 102
  },
  detalhesItem: {
    marginLeft: 20,
    flex: 1
  },
  txtTitulo: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 5
  },
  txtValor: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  txtDetalhes: {
    fontSize: 16
  }
  
});




