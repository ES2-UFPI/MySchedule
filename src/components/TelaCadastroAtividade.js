import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  TouchableOpacity

  } from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import Imagem from '../imgs/office.jpg'
import DateTimePicker from "react-native-modal-datetime-picker";

export  class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false
  }
 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
 
  render() {
    return (
      <>
        <Button title="Selecionar Data e hora" onPress={this.showDateTimePicker} />
        <DateTimePicker 
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'datetime'}
        />
      </>

    );
  }
}

export class Prioridade extends React.PureComponent {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  
  constructor(props) {
    super(props);
    this.state = { texto:'Dificuldade' };
  }
  alterarTexto=(a)=>{
    this.setState({texto:a},this.hideMenu)
    
}

  render() {
    return (
     
      <View style={styles.opcao} >
        <Menu 
          ref={this.setMenuRef}
          button={<Text style={{fontSize:25}}onPress={this.showMenu}>{this.state.texto}</Text>}
        >
          
          <MenuItem  onPress={()=>this.alterarTexto('Fácil')} >Fácil</MenuItem>
          <MenuItem onPress={()=>this.alterarTexto('Médio')} >Médio</MenuItem>
          <MenuItem onPress={()=>this.alterarTexto('Difícil')} >Difícil</MenuItem>
         
          
        </Menu>
      </View>
    );
  }
}
    
export class Frequencia extends React.PureComponent {
      _menu = null;
    
      setMenuRef = ref => {
        this._menu = ref;
      };
    
      hideMenu = () => {
        this._menu.hide();
      };
    
      showMenu = () => {
        this._menu.show();
      };

      
      constructor(props) {
        super(props);
        this.state = { texto:'Frequencia' };
      }
      alterarTexto=(a)=>{
        this.setState({texto:a},this.hideMenu)
        
    }

      render() {
        return (
         
          <View style={styles.opcao} >
            <Menu 
              ref={this.setMenuRef}
              button={<Text style={{fontSize:25}}onPress={this.showMenu}>{this.state.texto}</Text>}
            >
              
              <MenuItem  onPress={()=>this.alterarTexto('Diario')} >Diario</MenuItem>
              <MenuItem onPress={()=>this.alterarTexto('Semanal')}  >Semanal</MenuItem>
              <MenuItem onPress={()=>this.alterarTexto('Mensal')} >Mensal</MenuItem>
              
              <MenuItem  onPress={()=>this.alterarTexto('Anual')} >Anual</MenuItem>
              <MenuItem  onPress={()=>this.alterarTexto('Não se repete')} >Nao se repete</MenuItem>
            </Menu>
          </View>
        );
      }
    }
    
  
export default class CadastroAtividade extends Component{
  
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
                    />
        

        <View style={styles.input}  >
              <Frequencia></Frequencia>
              <Prioridade></Prioridade>
        </View>  


          
        <View style={styles.telabotao}>

      
          <DateTimePickerTester></DateTimePickerTester>
         
          </View>
        
        

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
    flex:8 
  },
  
  texto1:{
    fontSize:35,
    textAlign:'center',
    marginVertical:15,
    color:'#000000',
   

  },
  input:{
    
    fontSize: 25,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginVertical: 15,
    //padding:20,
    //height:50,
    //marginHorizontal:10,
    width:'100%'
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

  

 
});