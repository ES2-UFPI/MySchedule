import React, {Component} from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text, Button,
    TextInput, DatePickerAndroid,
    TimePickerAndroid, Picker
  } from 'react-native';
import { Input } from 'native-base';
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'moment/locale/pt-br'

export default class Editar extends Component {

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

      salvarDados = () => {
      //if (this.validarDados()) {
          //let obj = {
            //descricao: this.state.desc,
            //frequencia: this.state.frequencia,
            //dificuldade: this.state.dificuldade,
            //data: this.state.date
    
          //}
          //AsyncStorage.setItem("descricao", JSON.stringify(obj))
    
          //this.setState({ ...estadoInicial })
          this.props.navigation.navigate('home')
        //}
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
        if ((parseInt(this.state.date.getHours()) < parseInt(x.getHours()) && parseInt(dia) == x.getDate())
          || (parseInt(this.state.date.getMinutes()) < parseInt(x.getMinutes()) && parseInt(this.state.date.getHours()) == parseInt(x.getHours()))) {
          Alert.alert(
            'Hora Inválida!',
            'Digite uma hora válida')
          return false
        }
    
    
        return true
      }
    
    state = {
        repeticao: 'Não se repete',
        dificuldade: "Fácil"
    }
    render(){
        return (
          <View style={styles.container}>
            <View style={styles.background}>
              <Text style={styles.texto}>Editar atividade</Text>
            </View>
            <View style={styles.tela}>
              <TextInput style={styles.input} placeholder={"Descrição antiga"}/>
            <View style={styles.picker}>
              <Text  Style={styles.texto}>Frequência</Text>
              <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 200}}
                onValueChange={(itemValue, itemIndex) =>
                this.setState({language: "Semanalmente"})
              }>
                <Picker.Item label="Semanalmente" value="Semanalmente" />
                <Picker.Item label="Mensalmente" value="Mensalmente" />
                <Picker.Item label="Anualmente" value="Anualmente" />
                <Picker.Item label="Não se repete" value="Não se repete" />
              </Picker> 
            </View>
            <View>
              <Text>Dificuldade</Text>
              <Picker
                selectedValue={this.state.language}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                this.setState({language: "Fácil"})
              }>
                <Picker.Item label="Fácil" value="Fácil" />
                <Picker.Item label="Médio" value="Difícil" />
                <Picker.Item label="Difícil" value="Difícil" />
              </Picker>
            </View>
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
              <Text style={styles.botaoSalvar}>Atualizar</Text>
            </TouchableOpacity>
          </View>                  


        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    background: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold',
      },
    tela: {
      paddingTop: 5,
      flex: 8,
      paddingHorizontal: 30
    },
    texto: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 15,
    },
    input: {
      paddingBottom: 5,
      textAlign: 'center',
      borderRadius: 25,
      fontSize: 16,
      //marginTop: 15,
      elevation: 1,
      backgroundColor: '#fff'
    },
    button: {
      width: 300,
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
    },
    picker: {
      alignItems: 'flex-start',
      paddingTop: 5,
      marginTop: 20 
    }
  });