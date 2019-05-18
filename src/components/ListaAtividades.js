import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActionButton,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native-gesture-handler';
import TelaAtividade from './telaAtividade'
import moment from 'moment';
import Visualizar from './VisualizarAtividade'

export default class ListaAtividade extends Component {
  static navigationOptions = {
    title: "Lista de Atividades",
    color: "FFF"
  }

  constructor(props) {
    super(props);
    this.state={
      docs: [
      
    ],
    showVizualizar:false, desc:'',dificuldade:'',frequencia:'',data:null, key:'',
    }

  }


  recuperar = async () => {
    let docs = JSON.parse(await AsyncStorage.getItem('atividades'));
    this.setState({docs})
  }

  RecuperarData = async () => {
    try {
      let value = await AsyncStorage.getItem('descricao');
      let parsed = JSON.parse(value)

      let novaAtividade = {
        desc: parsed.descricao,
        frequencia: parsed.frequencia,
        dificuldade: parsed.dificuldade,
        data: parsed.data,
        key: this.state.docs.length.toString()
      }
     
      let docs = this.state.docs
      docs.push(novaAtividade);

      //this.setState({ docs }); 
      AsyncStorage.setItem("atividades", JSON.stringify(docs));

    } catch (error) {
      // Error retrieving data
      alert('eroo')
    }
  }


  renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.atividadeContainer} 
      onPress={()=>{this.setState({showVizualizar:true},this.setState({desc:item.desc}),this.setState({dificuldade:item.dificuldade}),this.setState({frequencia:item.frequencia}),this.setState({data:item.data}),this.setState({key:String(item.key)})  )}} >
      <Text style={styles.titulo}> {item.desc}</Text>
      <Text style={styles.hora}> {moment(item.data).format('HH:mm')} </Text>
     
    </TouchableOpacity>
    
  );


  render() {
   
    return (
     
      <View style={styles.tela}>
        
        <Visualizar 
           isVisible = {this.state.showVizualizar}
           style={styles.visualizar}
           cancelar={()=>this.setState({showVizualizar:false})}
           desc ={this.state.desc}
           dificuldade={this.state.dificuldade}
           frequencia={this.state.frequencia}
           data={this.state.data}
           chave = {this.state.key}
           >
        </Visualizar>

        <View style={styles.barraSuperior}>
          <Text style={styles.textDia}>11</Text>
          <Text style={styles.textMes}>Agosto</Text>
          
        </View>
        <ScrollView >
          <View style={styles.scrol}>

            <View style={styles.barraLateral}>
              <Text style={styles.textBarra}>00:00  {"\n\n"}01:00{"\n\n"}02:00{"\n\n"}03:00{"\n\n"}04:00{"\n\n"}05:00{"\n\n"}06:00{"\n\n"}07:00{"\n\n"}08:00{"\n\n"}09:00{"\n\n"}10:00{"\n\n"}11:00{"\n\n"}12:00{"\n\n"}13:00{"\n\n"}14:00{"\n\n"}15:00{"\n\n"}16:00{"\n\n"}17:00{"\n\n"}18:00{"\n\n"}19:00{"\n\n"}20:00{"\n\n"}21:00{"\n\n"}22:00{"\n\n"}23:00{"\n\n"}24:00 </Text>
            </View>

            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.docs}
              keyExtractor={item => item.key}
              renderItem={this.renderItem}
              extraData={this.state}
            />
          </View>
        </ScrollView>

        <View style={styles.barraInferior}>
          <Button onPress={this.RecuperarData} title='recuperar'></Button>
          <Button onPress={this.recuperar} title='recuperar2'></Button>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('cadastroDeAtividade')} >
            <Text style={styles.buttonText}>Nova Atividade</Text>
          </TouchableOpacity>

          
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  },
  barraLateral: {
    padding: 6,
    width: 50,
    backgroundColor: "#FFF",
  },
  textBarra: {
    fontSize: 14,
    marginVertical: 20
  },
  scrol: {
    flexDirection: 'row',
    backgroundColor: "#FFF"
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  hora: {
    color: "#666"
  },
  barraSuperior: {
    height: 55,
    backgroundColor: "#21409a",
    alignItems: "flex-end"
  },
  textMes: {
    backgroundColor: "#21409a",
    fontSize: 13,
    color: "#FFF",
  
    marginHorizontal: 15
  },
  textDia: {
    fontSize: 24,
    color: "#FFF",
    marginTop:3,
    marginHorizontal:25,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#21409a',
    borderRadius: 25,
    height: 45,
    marginTop: 12.5,
    marginHorizontal: 50,

  },
  barraInferior: {
    justifyContent: "space-between",
    alignContent: "flex-end"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10
  }, 
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list: {
    padding: 20
  },
  atividadeContainer: {
    backgroundColor: "#dcdcdc",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  visualizar:{
    flex:1,
    backgroundColor:'blue',
    color:'blue'
  }
})