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
            docs: [], dom: [], seg: [], ter: [], qua: [], qui: [], sex: [], sab: [],

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


            const seg = [], ter = [], qua = [], qui = [], sex = [], sab = [], dom = []

            for (var i = 0; i < docs1.length; i++) {
                // if (docs1[i].date.getMonth() === this.state.dataAtual.getMonth()) {
                if (docs1[i].date.getDay() === 0) {
                    dom.push(docs1[i])
                } else if (docs1[i].date.getDay() === 1) {
                    seg.push(docs1[i])
                } else if (docs1[i].date.getDay() === 2) {
                    ter.push(docs1[i])
                } else if (docs1[i].date.getDay() === 3) {
                    qua.push(docs1[i])
                } else if (docs1[i].date.getDay() === 4) {
                    qui.push(docs1[i])
                } else if (docs1[i].date.getDay() === 5) {
                    sex.push(docs1[i])
                } else if (docs1[i].date.getDay() === 6) {
                    sag.push(docs1[i])
                }
                //  }
            }

            this.setState({ dom, seg, ter, qua, qui, sex, sab })
        })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.atividadeContainer} onPress={this.telaAtividade}>
            <Text style={styles.titulo}> {item.descricao}</Text>
            {/*  <Text style={styles.hora}> {moment(item.date).format('HH:mm')} </Text>*/}
        </TouchableOpacity>
    );

    proximoDia = () => {

        let data = this.state.dataAtual
        let dia = data.getDate() + 7
        data.setDate(dia)
        this.setState({ dataAtual: data })
        this.componentDidMount()
    }

    diaAnterio = () => {
        let dia = this.state.dataAtual.getDate() - 7
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

                <View style={styles.diasSemana}>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}>  {this.state.dataAtual.getDate()} </Text>
                        <Text style={styles.textSemana}> Dom </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}>  {this.state.dataAtual.getDate() + 1} </Text>
                        <Text style={styles.textSemana}> Seg  </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}>  {this.state.dataAtual.getDate() + 2} </Text>
                        <Text style={styles.textSemana}> Ter </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}>  {this.state.dataAtual.getDate() + 3}</Text>
                        <Text style={styles.textSemana}> Qua </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.dataAtual.getDate() + 4}</Text>
                        <Text style={styles.textSemana}> Qui </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.dataAtual.getDate() + 5}</Text>
                        <Text style={styles.textSemana}> Sex </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.dataAtual.getDate() + 6}</Text>
                        <Text style={styles.textSemana}> Sab </Text>
                    </View>
                </View>

                <ScrollView >
                    <View style={styles.semana}>
                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.dom} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.seg} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.ter} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.qua} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.qui} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.sex} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

                        <View style={styles.scrol}>
                            <FlatList contentContainerStyle={styles.list} data={this.state.sab} keyExtractor={item => item.key} renderItem={this.renderItem} extraData={this.state} />
                        </View>

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
        backgroundColor: "#FFF",
        flex: 1
    },
    titulo: {
        fontSize: 12,
        fontWeight: "bold",
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
        padding: 2
    },
    atividadeContainer: {
        backgroundColor: "#dcdcdc",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 2,
        padding: 2,
        marginBottom: 5,
        flexDirection: "row",
        height: 50
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
    },
    diasSemana: {
        height: 50,
        flexDirection: 'row',
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#21409a'
    },
    semana: {
        flexDirection: 'row',
        padding: 5
    }, dia: {
        backgroundColor: '#FFF',
        flex: 1,
        borderRadius: 10,
        width: 20,
        alignItems: 'center',
        marginHorizontal: 15
    },
    textSemana: {
        fontSize: 15,
        color: "#FFF",
        flex: 1,
        alignContent: 'center',
        marginHorizontal: 7,
    },
    diaEsemana: {
        flexDirection: 'column',
    }
})