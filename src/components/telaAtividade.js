import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
 

const TelaAtividade = props =>
        <View style={{alignItems: "center",flex: 1}}>
            <Text>{props.id}</Text>
            
      </View>

 export default TelaAtividade