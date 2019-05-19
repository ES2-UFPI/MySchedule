import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  DatePickerAndroid,
  TouchableOpacity,
  Text,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native-gesture-handler';
import TelaCadastro from '../screens/TelaCadastroAtividade'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Dia extends Component {
  static navigationOptions = {
    title: "Atividades do Dia",
    color: "FFF"
  }

  constructor(props) {
    super(props);
  }

  state = {
	docs: [ ],
	dataAtual: new Date()
  };

  recuperar = async () => {
    let docs = JSON.parse(await AsyncStorage.getItem('atividades'));
    this.setState({ docs })
  }

  RecuperarData = async () => {

    let value = await AsyncStorage.getItem('descricao');
    let parsed = JSON.parse(value)

    let novaAtividade = {
      desc: parsed.descricao,
      frequencia: parsed.frequencia,
      dificuldade: parsed.dificuldade,
      data: parsed.data,
      key: this.state.docs.length.toString()
    }

    let docs = this.state.docs;
    docs.push(novaAtividade);

    this.setState({ docs });
    AsyncStorage.setItem("atividades", JSON.stringify(docs));

    <TelaCadastro>

    </TelaCadastro>
  };

  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.dataAtual
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.dataAtual)
        momentDate.date(e.day)
        momentDate.month(e.month)
        momentDate.year(e.year)
        this.setState({ dataAtual: momentDate.toDate() })
      }
    })
  }

  telaAtividade = () => {

  }
 
  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.atividadeContainer} onPress={this.telaAtividade}>
      <Text style={styles.titulo}> {item.desc}</Text>
      <Text style={styles.hora}> {moment(item.data).format('HH:mm')} </Text>
    </TouchableOpacity>
  );

  proximoDia = () =>{
	 
	  let data = this.state.dataAtual
	  let dia = data.getDate() + 1
	  data.setDate(dia)
	  this.setState({dataAtual: data})
  }

  diaAnterio  = () =>{
	let dia = this.state.dataAtual.getDate() - 1
	let data = this.state.dataAtual
	data.setDate(dia)
	this.setState({dataAtual: data})
}

  render() {
    return (
      <View style={styles.tela}>     
        <View style={styles.barraSuperior}>
          <TouchableOpacity style = {styles.botaoMenu} onPress ={() => this.props.navigation.openDrawer()}>
             <Icon name='bars' size={24} color ="#FFF"> </Icon>
          </TouchableOpacity>

          <Text style={styles.tituloBarra}>
            My Schedule
          </Text>

          <TouchableOpacity style = {styles.botaoPass} onPress ={this.diaAnterio}>
             <Icon name='angle-left' size={24} color ="#FFF"> </Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoDia} onPress ={this.handleDateAndroidChanged} extraData={this.state.dataAtual}>
            <Text style={styles.textDia} >{moment(this.state.dataAtual).locale('pt-br').format('D')}</Text>
            <Text style={styles.textMes} >{moment(this.state.dateAtual).locale('pt-br').format('MMMM')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.botaoPass} onPress ={this.proximoDia}>
             <Icon name='angle-right' size={24} color ="#FFF"> </Icon>
          </TouchableOpacity>

        </View>

        <ScrollView >
          <View style={styles.scrol}>
          
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

          <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('cadastroDeAtividade') } extraData={this.state} >
            <Text style={styles.buttonText}>Nova Atividade </Text>
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
    marginBottom: 5,
    flex: 1
  },
  hora: {
    width: 50,
    color: "#666"
  },
  barraSuperior: {
    height: 55,
    backgroundColor: "#21409a",
    flexDirection: "row"
  },
  tituloBarra: {
    width: 200,
    flex: 1,
    fontSize: 24,
    color: "#FFF",
    marginTop: 10,
    marginHorizontal: 20
  },
  infoDia: {
	width: 60,
	alignItems: 'center',
	justifyContent: 'center'
  },
  textMes: {
    backgroundColor: "#21409a",
    fontSize: 13,
    color: "#FFF",
    flex: 1
  },
  textDia: {
    fontSize: 24,
    color: "#FFF",
    // marginTop: 3,
    marginHorizontal: 5,
    flex: 1
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
    alignContent: "flex-end",
    marginVertical: 12.5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10
  }, container: {
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
    borderRadius: 2,
    padding: 10,
    marginBottom: 20,
    flexDirection: "row"
  },
  botaoMenu :{
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF"
  },
  botaoPass: {
	width: 20,
    alignItems: "center",
	justifyContent: "center",
    color: "#FFF"
  }
})