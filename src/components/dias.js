import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Dias extends React.Component {
  render() {
    return (
        <View style={{flex: 1, alignItems: "center"}}><Text>Dias</Text>
      <View style={{  justifyContent: "center" }}>
        <Button onPress={() => this.props.navigation.navigate('calendario')} title="Calendário"></Button> 
      </View>
      </View>
    );
  }
}