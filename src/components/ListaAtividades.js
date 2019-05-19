import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native-gesture-handler';
import TelaAtividade from './telaAtividade'
import TelaCadastro from '../screens/TelaCadastroAtividade'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListaAtividade extends Component {
  static navigationOptions = {
    title: "Lista de Atividades",
    color: "FFF"
  }

  constructor(props) {
    super(props);
  }

  state = {
    docs: []
  };

  recuperar = async () => {
    let atividades = JSON.parse(await AsyncStorage.getItem('atividades'));
    this.setState({ docs: atividades })
  }

  RecuperarData = async () => {

    let value = await AsyncStorage.getItem('descricao');
    let parsed = JSON.parse(value)

    let novaAtividade = {
      desc: parsed.descricao,
      frequencia: parsed.frequencia,
      dificuldade: parsed.dificuldade,
      data: parsed.data,
      key: this.state.docs.length.toString()
    }

    let docs = this.state.docs;
    docs.push(novaAtividade);

    this.setState({ docs });
    AsyncStorage.setItem("atividades", JSON.stringify(docs));

  };

  telaAtividade = () => {

  }

  novaAtividade = (docs) => {
    this.setState({ docs })
    AsyncStorage.setItem("atividades", JSON.stringify(docs));
  }


  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.atividadeContainer} onPress={this.telaAtividade}>
      <Text style={styles.titulo}> {item.desc}</Text>
      <Text style={styles.hora}> {moment(item.data).format('ddd, D [de] MMMM')} </Text>
    </TouchableOpacity>
  );

  render() {

    const desc1 = this.props.navigation.getParam('desc', 'x')
    if (desc1 != 'x') {

      let novaAtividade = {
        key: this.state.docs.length.toString(),
        desc: desc1,
      }

      let atividades = this.state.docs;
      atividades.push(novaAtividade);

      this.novaAtividade = { atividades }
    } else {
      this.recuperar
    }

    return (
      <View style={styles.tela}>
        <View style={styles.barraSuperior}>
          <TouchableOpacity style={styles.botaoMenu} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='bars' size={24} color="#FFF"> </Icon>
          </TouchableOpacity>

          <Text style={styles.tituloBarra}>
            My Schedule
          </Text>

        </View>

        <ScrollView >
          <View style={styles.scrol}>

            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.docs}
              keyExtractor={item => item.key}
              renderItem={this.renderItem}
              extraData={this.state}
            />
          </View>
        </ScrollView>

        <View style={styles.barraInferior}>
          {//  <Button onPress={this.recuperar} title='recuperar2'></Button> 
          }
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('cadastroDeAtividade')} extraData={this.state} >
            <Text style={styles.buttonText}>Nova Atividade </Text>
          </TouchableOpacity>

        </View>
      </View>
    );

  }

}
const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FFF"
  },
  barraLateral: {
    padding: 6,
    width: 50,
    backgroundColor: "#FFF",
  },
  textBarra: {
    fontSize: 14,
    marginVertical: 20
  },
  scrol: {
    flexDirection: 'row',
    backgroundColor: "#FFF"
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    flex: 1
  },
  hora: {
    width: 100,
    color: "#666"
  },
  barraSuperior: {
    height: 55,
    backgroundColor: "#21409a",
    flexDirection: "row"
  },
  tituloBarra: {
    width: 200,
    flex: 1,
    fontSize: 24,
    color: "#FFF",
    marginTop: 10,
    marginHorizontal: 50
  },
  infoDia: {
    width: 60,
  },
  textMes: {
    backgroundColor: "#21409a",
    fontSize: 13,
    color: "#FFF",
    flex: 1
  },
  textDia: {
    fontSize: 24,
    color: "#FFF",
    // marginTop: 3,
    marginHorizontal: 5,
    flex: 1
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#21409a',
    borderRadius: 25,
    height: 45,
    marginTop: 12.5,
    marginHorizontal: 50,

  },
  barraInferior: {
    justifyContent: "space-between",
    alignContent: "flex-end",
    marginVertical: 12.5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10
  }, container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list: {
    padding: 20
  },
  atividadeContainer: {
    backgroundColor: "#dcdcdc",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 2,
    padding: 10,
    marginBottom: 12.5,
    flexDirection: "row"
  },
  botaoMenu: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF"
  }
})