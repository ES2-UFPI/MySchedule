import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, TextInput, View, Text, Image } from 'react-native';

import logo from '../imgs/logo.png';

const { width: WIDTH } = Dimensions.get('window')

export default class TelaLogin extends Component 
{
    static navigationOptions = {
        title: "Sair",
        color: "FFF"
    }
    
    constructor (props)
    {
        super (props)

        this.state = {
            email: '',
            password: '',
            warning: ''
        }
    }
    
    Entrar = () => {
        var emailRegex = new RegExp('(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')

        var notNull = this.state.email && this.state.password
        var fullPassword = this.state.password.length > 5
        var validEmail = emailRegex.test(this.state.email)

        if (notNull && fullPassword && validEmail)
        {
            this.setState({warning: ''})
            this.props.navigation.navigate('home')
        }
        else
        {
            if (!notNull)
                this.setState({warning: 'Todos os campos devem ser preenchidos!'})
            else if (!fullPassword || !validEmail)
                this.setState({warning: 'Email e/ou senha inválido(s)!'})
        }
    }  

	render ()
	{
		return (
            <View style = {Styles.container}>
                <View style = {Styles.logoContainer}>
                    <Image source = {logo}/>
                    <Text style = {Styles.subtitleContainer}>Tudo ao seu tempo!</Text>
                    <View style = {Styles.formContainer}>
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
                        onPress = {this.Entrar}
                    >
                        <Text style={Styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={Styles.message}>{this.state.warning}</Text>
                    <Text style={Styles.footer}>MySchedule © UFPI, 2019</Text>
                </View>
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