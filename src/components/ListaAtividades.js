import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import axios from 'axios';
import Atividade from './Atividade';

export default class ListaAtividade extends Component {

  constructor(props) {
    super(props);
  this.state = { listaAtividade: [{"nome": "Banhar", "dia": "23/12/19", "hora": "14:30", "descricao": "Banhar peladim"},
  {"nome": "Ir ali", "dia": "25/03/19", "hora": "9:35", "descricao": "Ir naquele lugar"},] }
  }

 /* componentWillMount() {
    axios.get('http://faus.com.br/recursos/c/dmairr/api/itens.html')
      .then(response => { this.setState({ listaAtividade: response.data }); })
      .catch(() => { console.log('Erro ao recuperar os dados'); });
  }*/

  render() {
    return (
        <ScrollView style={{backgroundColor: '#DDD'}}>
            { this.state.listaAtividade.map( atividade =>  (<Atividade key={atividade.nome} atividade={atividade} />))}
        </ScrollView>
    );
  }
}
