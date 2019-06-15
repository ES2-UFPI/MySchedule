import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import Visualizar from './VisualizarAtividade'
import firebase from 'react-native-firebase'
//import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage';

import PushNotification from 'react-native-push-notification'
import { throwStatement } from '@babel/types';



PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
      console.log( 'TOKEN:', token );
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  //permissions: {
  //    alert: true,
   //   badge: true,
   //   sound: true
  //},

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: true,
});





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

  validarDados = (data) => {
    
    let ano = data.getYear() + 1900
    let mes = data.getMonth() + 1
    let dia = data.getDate()
    let x = new Date()

    if ((parseInt(dia) < x.getDate() && parseInt(mes) == parseInt(x.getMonth() + 1) && parseInt(ano) == parseInt(x.getYear() + 1900))
      || (parseInt(ano) < parseInt(x.getYear() + 1900))
      || (parseInt(mes) < parseInt(x.getMonth() + 1) && parseInt(ano) == parseInt(x.getYear() + 1900))) {
      
      return false
    }

    if( (parseInt(dia) == parseInt(x.getDate()) &&  parseInt(data.getHours()) < parseInt(x.getHours()) )
      ||(parseInt(data.getMinutes()) < parseInt(x.getMinutes()) &&  parseInt(data.getHours()) == parseInt(x.getHours()) && parseInt(dia) == parseInt(x.getDate()) )  ){
       
          return false
      }

    return true
  }

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

      for(let i=0;i<docs.length;i++){
        let a = docs[i]
        if(this.validarDados(a.date)){
          PushNotification.localNotificationSchedule({
            title: a.descricao, 
            message:"",
            bigText : "Às "+moment(a.date).format("HH : mm")+ "\nDificuldade: "+a.dificuldade,
            date: a.date ,
            color: "blue",
            actions : ' ["Concluir", "Adiar"] '
      
        })
       }
      }
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
    marginVertical: 12.5,
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