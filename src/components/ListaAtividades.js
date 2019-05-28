import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import Visualizar from './VisualizarAtividade'
import firebase from 'react-native-firebase'
//import 'moment/locale/pt-br'

export default class ListaAtividade extends Component {
  static navigationOptions = {
    header: () => null, 
    tabBarVisible: false 
  }

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('tasks')
    this.state = {
      docs: [],
      showVizualizar: false, desc: '', dificuldade: '', frequencia: '', data: null, key: '', doc: null
    }
  }


  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.atividadeContainer}
      onPress={() => { this.setState({ showVizualizar: true }, this.setState({ desc: item.descricao }), this.setState({ dificuldade: item.dificuldade }), this.setState({ frequencia: item.frequencia }), this.setState({ data: item.date }), this.setState({ key: String(item.key) }), this.setState({ doc: item.doc })) }} >
      <Text style={styles.titulo}> {item.descricao}</Text>
      <Text style={styles.hora}> {moment(item.date).format('ddd, D [de] MMMM')} </Text>
      {/* <Text style={styles.hora}> {item.data} </Text>*/}
    </TouchableOpacity>
  );

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(querySnapshot => {
      const docs = []
      querySnapshot.forEach(doc => {
        const { descricao, frequencia, dificuldade, data } = doc.data()
        // alert(data)
        let date = new Date(data)
        docs.push({
          doc,
          key: doc.id,
          descricao,
          frequencia,
          dificuldade,
          date

        })
      })

      this.setState({ docs })

    })
  }

  render() {
    return (
      <View style={styles.tela}>

        <View style={styles.barraSuperior}>
          <TouchableOpacity style={styles.botaoMenu} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='bars' size={24} color="#FFF"> </Icon>
          </TouchableOpacity>

          <Text style={styles.tituloBarra}>
            MySchedule
          </Text>
        </View>

        <Visualizar
          isVisible={this.state.showVizualizar}
          style={styles.visualizar}
          cancelar={() => this.setState({ showVizualizar: false })}
          desc={this.state.desc}
          dificuldade={this.state.dificuldade}
          frequencia={this.state.frequencia}
          data={this.state.data}
          chave={this.state.key}
          doc={this.state.doc}
        >
        </Visualizar>

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
  },
  container: {
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
    color: "#FFF",
  },
  visualizar: {
    flex: 1,
    backgroundColor: 'blue',
    color: 'blue'
  }
})