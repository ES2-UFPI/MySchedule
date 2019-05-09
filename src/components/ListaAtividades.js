import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  
  Text
} from 'react-native';
import axios from 'axios';
import Atividade from './Atividade';
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'

export default class ListaAtividade extends Component {

  constructor(props) {
    super(props);
    this.state = {
     // listaAtividade: [{ "nome": "Banhar", "dia": "23/12/19", "hora": "14:30", "descricao": "Banhar peladim" },
      //{ "nome": "Ir ali", "dia": "25/03/19", "hora": "9:35", "descricao": "Ir naquele lugar" },],
      desc:'',frequencia:'',dificuldade:'',data:new Date()
    }
  }

  /* componentWillMount() {
     axios.get('http://faus.com.br/recursos/c/dmairr/api/itens.html')
       .then(response => { this.setState({ listaAtividade: response.data }); })
       .catch(() => { console.log('Erro ao recuperar os dados'); });
   }*/
 
   RecuperarData = async () => {
    try {
      let value = await AsyncStorage.getItem('descricao');
      let parsed = JSON.parse(value)
      //alert(parsed.descricao)
      //alert(parsed.frequencia)
      this.setState({desc:parsed.descricao})
      this.setState({frequencia:parsed.frequencia})
      this.setState({dificuldade:parsed.dificuldade})
      this.setState({data:parsed.data})
    } catch (error) {
      // Error retrieving data
      alert('eroo')
    }
  };

  
  render() {
   
    
    
    return (
      
      <View>
        <ScrollView style={{ backgroundColor: '#DDD' }}>
          {/*{this.state.listaAtividade.map(atividade => (<Atividade key={atividade.nome} atividade={atividade} />))}*/}
         
        </ScrollView>
        <View>
          
          <Button onPress={() => this.props.navigation.navigate('cadastroDeAtividade')} title="Nova Atividade"> </Button>
          <Button onPress={this.RecuperarData} title='recuperaar'></Button>
          <Text>
                {this.state.desc}
                {this.state.dificuldade}
                {this.state.frequencia}
                {this.state.date}
          </Text>
        </View>
      </View>
      
    );
 //
  
}
}
