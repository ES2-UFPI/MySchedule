
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  DatePickerAndroid,
  TimePickerAndroid,
  TouchableOpacity,
  

  } from 'react-native';

import moment from 'moment'
import Imagem from '../imgs/office.jpg'
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';

class Frequencia extends Component {
  constructor(props){
    super(props)
    
  }
  render() {
    let data = [{
      value: 'Diario',
    }, {
      value: 'Semanal',
    }, {
      value: 'Mensal',
    },{
      value: 'Anual',
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
      <Dropdown value={this.props.def} onChangeText={this.props.mudar}
        label='Dificuldade'
        data={data}
      />
    );
  }
}

export default class CadastroAtividade extends Component{
  
  constructor(props){
    super(props)
    this.state= {
   
    desc:'',
    date: new Date(),
    frequencia:'',
    dificuldade:''
  }
  }

  handleDateAndroidChanged=()=>{
        DatePickerAndroid.open({
          date: this.state.date
        }).then(e =>{
            if(e.action!==DatePickerAndroid.dismissedAction){
            const momentDate = moment(this.state.date)
            momentDate.date(e.day)
            momentDate.month(e.month)
            momentDate.year(e.year)
            this.setState({date: momentDate.toDate()})
            }
        })
  }
  
  handleTimeAndroidChanged=()=>{
    TimePickerAndroid.open({
      date: this.state.date.getHours
    }).then(e =>{
        if(e.action!==TimePickerAndroid.dismissedAction){
        const momentDate = moment(this.state.date)
        momentDate.hours(e.hour)
        momentDate.minute(e.minute)
        this.setState({date: momentDate.toDate()})
        }
    })
}

  mudarfrequencia=freq=>{
    this.setState({frequencia:freq})
  }
  mudarDificuldade=dif=>{
    this.setState({dificuldade:dif})
  }

  salvarDados=()=>{
    let obj={
       descricao: this.state.desc,
       frequencia: this.state.frequencia,
       dificuldade: this.state.dificuldade,
       data:this.state.date

    }
    AsyncStorage.setItem("descricao",JSON.stringify(obj))
    this.props.navigation.navigate('home')
   
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
                    onChangeText={desc=>this.setState({desc})}
                    value={this.state.desc}
                    returnKeyType = 'go'/>
        
              <Frequencia  freq = {this.state.frequencia} mudar={this.mudarfrequencia}></Frequencia>
              <Dificuldade dif = {this.state.dificuldade} mudar={this.mudarDificuldade}></Dificuldade>
      

        <TouchableOpacity style={styles.button} onPress={this.handleDateAndroidChanged}>
          <Text style = {styles.buttonText}>
            {moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this.handleTimeAndroidChanged}>
          <Text style = {styles.buttonText}>
            {moment(this.state.date).format('hh : mm a ')}
          </Text>
        </TouchableOpacity>
        
          
        <Button title='Salvar' onPress={this.salvarDados}></Button>
        </View>
        
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  background:{
      flex:2,
      alignItems:'flex-start',
      justifyContent:'center',
  },
  tela:{
    flex:8 ,
    paddingHorizontal:30
  },
  
  texto1:{
    fontSize:35,
    textAlign:'center',
    marginVertical:15,
    color:'#000000',
  },
  input:{
    /*
    fontSize: 25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginVertical: 15,
    width:'100%'*/
    textAlign: 'center',
        borderRadius: 25,
        fontSize: 16,
        marginTop: 15,
        elevation: 1,
        backgroundColor:'#fff'
  },
  opcao:{
    borderColor:'black',
    alignItems:'flex-start',
    marginHorizontal:10,
    justifyContent:'center',
},
telabotao:{
    marginVertical:20,
    marginHorizontal:10
},
button:
    {
        alignItems: 'center',
        height: 45,
        marginTop: 20,
        elevation: 1,
        backgroundColor:'#fff'
    },
    buttonText:
    {
        //color: '#fff',
        //fontSize: 16,
        marginTop: 10
    },
});
