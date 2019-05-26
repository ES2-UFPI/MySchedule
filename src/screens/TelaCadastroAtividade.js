
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';

import moment from 'moment'
import Imagem from '../imgs/office.jpg'
import { Dropdown } from 'react-native-material-dropdown'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'moment/locale/pt-br'
import firebase from 'react-native-firebase'

class Frequencia extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let data = [{
      value: 'Diariamente',
    }, {
      value: 'Semanalmente',
    }, {

      value: 'Mensalmente',
    },{
      value: 'Anualmente',
    },{

      value: 'Não se repete'
    }];
    return (
      <Dropdown value={this.props.freq} onChangeText={this.props.mudar}
        label='Frequencia'
        data={data}
      />
    );
  }
}

class Dificuldade extends Component {
  render() {
    let data = [{
      value: 'Fácil',
    }, {
      value: 'Médio',
    }, {
      value: 'Difícil',
    }];
    return (
      <Dropdown value={this.props.dif} onChangeText={this.props.mudar}
        label='Dificuldade'
        data={data}
      />
    );
  }
}

const estadoInicial = { desc: '', date: new Date(), frequencia: 'Não se repete', dificuldade: '', }

export default class CadastroAtividade extends Component {
  static navigationOptions = {
    title: "Nova Atividade",
    color: "FFF"
  }
  constructor(props) {
    super(props)
    this.ref = firebase.firestore().collection('tasks')
    this.state = {
      ...estadoInicial,
      //tasks:[]
    }
  }

  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.date
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date)
        momentDate.date(e.day)
        momentDate.month(e.month)
        momentDate.year(e.year)
        this.setState({ date: momentDate.toDate() })
      }
    })
  }

  handleTimeAndroidChanged = () => {
    TimePickerAndroid.open({
      date: this.state.date
    }).then(e => {
      if (e.action !== TimePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.date)
        momentDate.hours(e.hour)
        momentDate.minute(e.minute)
        this.setState({ date: momentDate.toDate() })
      }
    })
  }

  mudarfrequencia = frequencia => {
    this.setState({ frequencia })
  }
  mudarDificuldade = dificuldade => {
    this.setState({ dificuldade })
  }

  validarDados = () => {
    if (!this.state.desc.trim()) {
      Alert.alert(
        'Descrição vazia!',
        'Informe Uma Descrição')
      return false
    }
    let ano = this.state.date.getYear() + 1900
    let mes = this.state.date.getMonth() + 1
    let dia = this.state.date.getDate()
    let x = new Date()


    if ((parseInt(dia) < x.getDate() && parseInt(mes) == parseInt(x.getMonth() + 1) && parseInt(ano) == parseInt(x.getYear() + 1900))
      || (parseInt(ano) < parseInt(x.getYear() + 1900))
      || (parseInt(mes) < parseInt(x.getMonth() + 1) && parseInt(ano) == parseInt(x.getYear() + 1900))) {
      Alert.alert(
        'Data Inválida!',
        'Digite uma data válida')
      return false
    }
    if( (parseInt(dia) == parseInt(x.getDate()) &&  parseInt(this.state.date.getHours()) < parseInt(x.getHours()) )
      ||(parseInt(this.state.date.getMinutes()) < parseInt(x.getMinutes()) &&  parseInt(this.state.date.getHours()) == parseInt(x.getHours()) && parseInt(dia) == parseInt(x.getDate()) )  ){
        Alert.alert(
          'Hora Inválida!',
          'Digite uma hora válida',)
          return false
      }


    return true
  }

  salvarDados = () => {
    if (this.validarDados()) {
      let obj = {
        descricao: this.state.desc,
        frequencia: this.state.frequencia,
        dificuldade: this.state.dificuldade,
        data: this.state.date

      }

      //AsyncStorage.setItem("descricao", JSON.stringify(obj))
       
      this.ref.add({
        descricao: this.state.desc,
        frequencia: this.state.frequencia,
        dificuldade: this.state.dificuldade,
        data: this.state.date
            
      }).then((data) =>{

      }).catch((error) =>{
          alert('erro')
      })


      this.setState({ ...estadoInicial })
      this.props.navigation.navigate('home')
    }
  }

  render() {

    return (
      <View style={styles.container}>

        <ImageBackground
          source={Imagem}
          style={styles.background}>
          <Text style={styles.texto1}>Nova Atividade</Text>
        </ImageBackground>

        <View style={styles.tela}>
          <TextInput style={styles.input}
            placeholder="Descricão"
            onChangeText={desc => this.setState({ desc })}
            value={this.state.desc}
            returnKeyType='go' />

          <Frequencia freq={this.state.frequencia} mudar={this.mudarfrequencia}></Frequencia>
          <Dificuldade dif={this.state.dificuldade} mudar={this.mudarDificuldade}></Dificuldade>


          <TouchableOpacity style={styles.button} onPress={this.handleDateAndroidChanged}>
            <Text style={styles.buttonText}>
              <Icon name='calendar' size={15} ></Icon>
              {moment(this.state.date).locale('pt-br').format('   ddd, D [de] MMMM')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this.handleTimeAndroidChanged}>
            <Text style={styles.buttonText}>
              <Icon name='clock-o' size={15} ></Icon>
              {moment(this.state.date).format('   HH : mm')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}
            onPress={this.salvarDados}>
            <Text style={styles.botaoSalvar}>Salvar</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tela: {
    flex: 8,
    paddingHorizontal: 30
  },

  texto1: {
    fontSize: 35,
    textAlign: 'center',
    marginVertical: 15,
    color: '#000000',
  },
  input: {
    textAlign: 'center',
    borderRadius: 25,
    fontSize: 16,
    marginTop: 15,
    elevation: 1,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    height: 45,
    marginTop: 20,
    elevation: 1,
    backgroundColor: '#fff'
  },
  button2: {
    alignItems: 'center',
    height: 45,
    marginTop: 20,
    borderRadius: 25,
    elevation: 1,
    backgroundColor: '#21409a'
  },
  buttonText: {
    //color: '#fff',
    //fontSize: 16,
    //alignItems:'center',
    //textAlign:'justify',
    //marginTop: 10
    padding: 10
  },
  botaoSalvar: {
    color: 'white',
    padding: 8,
    fontSize: 20,
  }
});
