import React from "react"
import { View } from "react-native"

import TelaLogin from '../screens/TelaLogin'

export default class Login extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <TelaLogin/>
            </View>
        );
    }
}