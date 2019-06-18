import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, TextInput, View, Text, Image,Alert } from 'react-native';

import logo from '../imgs/logo.png';
import firebase from 'react-native-firebase'
const { width: WIDTH } = Dimensions.get('window')

export default class CriarConta extends Component 
{
    static navigationOptions = {
        title: "Criar conta",
        color: "#FFF",
        headerStyle: { backgroundColor: '#21409a' },
        headerTitleStyle: { color: '#FFF' },
     
      }
    constructor (props)
    {
        super (props)

        this.state = {
            email: '',
            password: '',
            password2:'',
            warning: '',
        }
    }
    

criarConta = async() =>{
    var notNull = this.state.email && this.state.password
    var emailRegex = new RegExp('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')
    var validEmail = emailRegex.test(this.state.email)
    var fullPassword = this.state.password.length > 5
    if (!notNull){
        this.setState({warning: 'Todos os campos devem ser preenchidos!'})
        return
    }
    if(this.state.password!==this.state.password2){
        this.setState({warning: 'Senhas não coincidem!'})
        return
    }
    if(!validEmail || !fullPassword){
        this.setState({warning: 'Email e/ou senha inválido(s)!'})
        return
    }
    try{
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        this.setState({warning:''})
        
        Alert.alert("Conta criada com sucesso","")
        this.props.navigation.goBack()
    }catch(err){
        this.setState({warning:String(err)})
    }

}
render(){
    return(
        <View>
            <TextInput
                        style = {Styles.input}
                        keyboardType = 'email-address'
                        placeholder = 'Endereço de Email'
                        placeholderTextColor = '#98a7d3'
                        returnKeyType = 'next'
                        autoCapitalize = 'none'
                        autoCorrect = {false}
                        onSubmitEditing = {() => this.passwordInput.focus()}
                        onChangeText = {(email) => this.setState({email})}

                    />
                    <TextInput
                        style = {Styles.input}
                        placeholder = 'Senha'
                        placeholderTextColor = '#98a7d3'
                        secureTextEntry
                        returnKeyType = 'go'
                        ref = {(input) => this.passwordInput = input}
                        onChangeText = {(password) => this.setState({password})}
                    />
                    <TextInput
                        style = {Styles.input}
                        placeholder = 'Confirmar Senha'
                        placeholderTextColor = '#98a7d3'
                        secureTextEntry
                        returnKeyType = 'go'
                        ref = {(input) => this.passwordInput = input}
                        onChangeText = {(password2) => this.setState({password2})}
                    />
                    <TouchableOpacity
                        style = {Styles.button}
                        onPress = {this.criarConta}>
                        <Text style={Styles.buttonText}>criar conta</Text>
                    </TouchableOpacity>
                    
                    <Text style={Styles.message}>{this.state.warning}</Text>
                   
        </View>
    )
}

}


const Styles = StyleSheet.create({
    container: 
    {
        flex: 1
    },
    logoContainer:
    {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    subtitleContainer:
    {
        color: '#21409a',
        marginTop: 20
    },
    input:
    {
        textAlign: 'center',
        borderRadius: 25,
        fontSize: 16,
        marginTop: 15,
        elevation: 1,
        backgroundColor: '#fff'
    },
    formContainer:
    {
        width: WIDTH - 100,
        marginTop: 50
    },
    button:
    {
        alignItems: 'center',
        backgroundColor: '#21409a',
        borderRadius: 25,
        height: 45,
        marginTop: 12.5,
    },
    buttonText:
    {
        color: '#fff',
        fontSize: 16,
        marginTop: 10
    },
    footer:
    {
        marginTop: 100, 
        fontSize: 10, 
        color: '#21409a'
    },
    message:
    {
        marginHorizontal:50,
        marginTop: 50,
        fontSize: 12,
        color: 'red'
    }
})