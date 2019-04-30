import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class Calendario extends React.Component {
  render() {
    return (
      <View Style={{flex: 1, alignItems: "center" }}><Text>Calendario</Text>
      <View style={{  justifyContent: "center" }}>
        <Button  onPress={() => this.props.navigation.navigate('semanas')} title="Semanas"></Button> 
      </View>
      </View>
    );
  }
}
