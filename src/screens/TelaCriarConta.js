import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, TextInput, View, Text, Image } from 'react-native';

import logo from '../imgs/logo.png';
import firebase from 'react-native-firebase'
const { width: WIDTH } = Dimensions.get('window')

export default class CriarConta extends Component 
{
    static navigationOptions = {
        title: "Criar conta",
        color: "FFF",
        drawerLockMode: 'locked-open',
     
    }
    constructor (props)
    {
        super (props)

        this.state = {
            email: '',
            password: '',
            warning: '',
        }
    }
    

criarConta = () =>{
    try{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        this.props.navigation.navigate('home')
    }catch(err){
            alert(err)
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
                    <TouchableOpacity
                        style = {Styles.button}
                        onPress = {this.criarConta}>
                        <Text style={Styles.buttonText}>criar conta</Text>
                    </TouchableOpacity>
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
        marginTop: 50,
        fontSize: 12,
        color: 'red'
    }
})