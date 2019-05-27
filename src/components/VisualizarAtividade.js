import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Text,
    Modal,
    TouchableWithoutFeedback,


} from 'react-native';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Entypo'

import { ConfirmDialog } from 'react-native-simple-dialogs';
import firebase from 'react-native-firebase'

export default class Visualizar extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('tasks')
        this.state = {
            dialogVisible: false
        }

    }

    excluir = () =>{
        this.props.doc.ref.delete()
        this.setState({ dialogVisible: false }, this.props.cancelar)
    }

    render() {
        let data = ''
        let d = new Date()
        if (moment(this.props.data).format('DD MMMM YYYY') === moment(d).format('DD MMMM YYYY')) {
            data = 'Hoje'
        } else {
            data = moment(this.props.data).format('DD [de] MMMM YYYY')
        }
        return (
            <Modal onRequestClose={this.props.cancelar}
                visible={this.props.isVisible}
                animationType='none'
                transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.cancelar}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>

                    <ConfirmDialog
                        title="Excluir Atividade?"
                        message="Deseja realmente excluir essa atividade?"
                        visible={this.state.dialogVisible}

                        positiveButton={{
                            title: "Sim",
                            onPress: this.excluir
                        }}
                        negativeButton={{
                            title: "Não",
                            onPress: () => this.setState({ dialogVisible: false })
                        }}
                    />
                    <Text style={styles.header}>{this.props.desc}</Text>
                    <Text
                        style={styles.texto}>
                        <Icon3 name='dot-single' size={20}></Icon3>
                        {data} às
                        {moment(this.props.data).format(" HH : mm")}
                    </Text>
                    <Text
                        style={styles.texto}>
                        <Icon3 name='dot-single' size={20}></Icon3>
                        Repete : {this.props.frequencia}
                    </Text>
                    <Text
                        style={styles.texto}>
                        <Icon3 name='dot-single' size={20}></Icon3>
                        Dificuldade : {this.props.dificuldade}
                    </Text>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={this.props.cancelar}>
                            <Text style={styles.button}><Icon2 name='close' size={25}></Icon2></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.editar}>
                            <Text style={styles.button}><Icon name='pencil' size={20}></Icon></Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.setState({ dialogVisible: true })}>
                            <Text style={styles.button}><Icon name='trash-o' size={20}></Icon></Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.cancelar}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>


            </Modal>
        )
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 2,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    button: {
        margin: 20,
        marginRight: 30,
        //color:"red"
    },
    header: {
        backgroundColor: '#21409a',
        color: 'white',
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
    },
    texto: {

        fontSize: 20,
        marginLeft: 20,
        padding: 20,
    }

})
