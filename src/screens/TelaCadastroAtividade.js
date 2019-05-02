
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  FlatList,
  SectionList,
  TouchableWithoutFeedback
  } from 'react-native';

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import Imagem from '../../imagens/office.jpg'

export const Opcao=props=>{
   return(
    <View style={styles.opcao}>
        <Text>{props.dia}</Text>
    </View>
     )  }

export class Men extends React.PureComponent {
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
    
      render() {
        return (
          <View  >
            <Menu 
              ref={this.setMenuRef}
              button={<Text style={styles.input} onPress={this.showMenu}>Não repete</Text>}
            >
              <MenuItem style={{fontSize:30}} onPress={this.hideMenu}>Diario</MenuItem>
              <MenuItem style={{fontSize:30}} onPress={this.hideMenu}>Semanal</MenuItem>
              <MenuItem style={{fontSize:30}} onPress={this.hideMenu}>Mensal</MenuItem>
              {/*<MenuDivider />*/}
              <MenuItem style={{fontSize:30}} onPress={this.hideMenu}>Anual</MenuItem>
            </Menu>
          </View>
        );
      }
    }
    
  
export default class App extends Component{
  
  state={
    Descricao:[]
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
                    />
        {/*<Text style={styles.input}>Dias da semana</Text>*/}

        <View style={styles.telaop} >
              <Men></Men>
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
    fontSize: 30,
    textAlign: 'left',
    marginVertical: 10,
    height:50,
    width:'100%'
  },
  opcao:{
    height:30,
    width:30,
    borderRadius:15,
    borderColor:'black',
    backgroundColor:'#90ee90',
    alignItems:'center',
    justifyContent:'center',
},
telaop:{
    flex:1,
    alignItems:'flex-start',
    paddingHorizontal:15

}
 
});
