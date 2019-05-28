import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  DatePickerAndroid,
  TouchableOpacity,
  Text,

} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'react-native-firebase'

export default class Dia extends Component {
  static navigationOptions = {
    header: () => null, 
    tabBarVisible: false 
  }

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('tasks')
    this.state = {
      docs: [],
      showVizualizar: false, desc: '', dificuldade: '', frequencia: '', data: null, key: '', doc: null,
      dataAtual: new Date()
    }
  }

  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.dataAtual
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.dataAtual)
        momentDate.date(e.day)
        momentDate.month(e.month)
        momentDate.year(e.year)
        this.setState({ dataAtual: momentDate.toDate() })
        this.componentDidMount()
      }
    })
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(querySnapshot => {
      const docs1 = []
      querySnapshot.forEach(doc => {
        const { descricao, frequencia, dificuldade, data } = doc.data()
        //alert(data)

        let date = new Date(data)
        docs1.push({
          doc,
          key: doc.id,
          descricao,
          frequencia,
          dificuldade,
          date

        })
      })

      const docs = []

      for (var i = 0; i < docs1.length; i++) {
        //alert('sss' + docs1[i].date.getDate())
        //alert('iii' + this.state.dataAtual.getDate())
        if (docs1[i].date.getDate() === this.state.dataAtual.getDate()) {
          if (docs1[i].date.getMonth() === this.state.dataAtual.getMonth()) {
            docs.push(docs1[i])
          }
        }
      }

      this.setState({ docs })
    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.atividadeContainer} onPress={this.telaAtividade}>
      <Text style={styles.titulo}> {item.descricao}</Text>
      <Text style={styles.hora}> {moment(item.data).format('HH:mm')} </Text>
    </TouchableOpacity>
  );

  proximoDia = () => {

    let data = this.state.dataAtual
    let dia = data.getDate() + 1
    data.setDate(dia)
    this.setState({ dataAtual: data })
    this.componentDidMount()
  }

  diaAnterio = () => {
    let dia = this.state.dataAtual.getDate() - 1
    let data = this.state.dataAtual
    data.setDate(dia)
    this.setState({ dataAtual: data })
    this.componentDidMount()
  }

  render() {
    return (
      <View style={styles.tela}>
        <View style={styles.barraSuperior}>
          <TouchableOpacity style={styles.botaoMenu} onPress={() => this.props.navigation.openDrawer()}>
            <Icon name='bars' size={24} color="#FFF"> </Icon>
          </TouchableOpacity>

          <Text style={styles.tituloBarra}>
            My Schedule
          </Text>

          <TouchableOpacity style={styles.botaoPass} onPress={this.diaAnterio}>
            <Icon name='angle-left' size={24} color="#FFF"> </Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoDia} onPress={this.handleDateAndroidChanged} extraData={this.state.dataAtual}>
            <Text style={styles.textDia} >{moment(this.state.dataAtual).locale('pt-br').format('D')}</Text>
            <Text style={styles.textMes} >{moment(this.state.dateAtual).locale('pt-br').format('MMMM')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoPass} onPress={this.proximoDia}>
            <Icon name='angle-right' size={24} color="#FFF"> </Icon>
          </TouchableOpacity>

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
    width: 50,
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
    marginHorizontal: 20
  },
  infoDia: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
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
    marginBottom: 20,
    flexDirection: "row"
  },
  botaoMenu: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF"
  },
  botaoPass: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF"
  }
})