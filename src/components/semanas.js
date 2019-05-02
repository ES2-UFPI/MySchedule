import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Semansas extends React.Component {
  render() {
    return (

        <View style={{alignItems: "center",flex: 1}}><Text>Semanas</Text>
      <View style={{   justifyContent: "center" }}>
        <Button onPress={() => this.props.navigation.navigate('dias')} title="Dias"></Button> 
      </View>
      </View>
    );
  }
}