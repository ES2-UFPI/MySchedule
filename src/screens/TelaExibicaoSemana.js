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
            dataAtual: new Date(), s: new Date(), t: new Date(), qa: new Date(), qi: new Date(), se: new Date(), sa: new Date(), do: new Date()

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



            let data = this.state.do
            data.setDate(data.getDate() - 7)

            for (var i = 0; i < 7; i++) {
                if (data.getDay() == 0) {
                    let ddo = new Date(data), ds = new Date(data)
                    let dt = new Date(data)
                    let dqa = new Date(data)
                    let dqi = new Date(data)
                    let dse = new Date(data)
                    let dsa = new Date(data)

                    ds.setDate(data.getDate() + 1)
                    dt.setDate(data.getDate() + 2)
                    dqa.setDate(data.getDate() + 3)
                    dqi.setDate(data.getDate() + 4)
                    dse.setDate(data.getDate() + 5)
                    dsa.setDate(data.getDate() + 6)

                    this.setState({ do: ddo, s: ds, t: dt, qa: dqa, qi: dqi, se: dse, sa: dsa })
                } else {
                    data.setDate(data.getDate() + 1)
                }
            }


            const seg = [], ter = [], qua = [], qui = [], sex = [], sab = [], dom = []

            for (var i = 0; i < docs1.length; i++) {
                if (docs1[i].date.getMonth() === this.state.do.getMonth()) {
                    if (docs1[i].date.getDay() === 0 && docs1[i].date.getDate() === this.state.do.getDate()) {
                        dom.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 1 && docs1[i].date.getDate() === this.state.s.getDate()) {
                        seg.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 2 && docs1[i].date.getDate() === this.state.t.getDate()) {
                        ter.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 3 && docs1[i].date.getDate() === this.state.qa.getDate()) {
                        qua.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 4 && docs1[i].date.getDate() === this.state.qi.getDate()) {
                        qui.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 5 && docs1[i].date.getDate() === this.state.se.getDate()) {
                        sex.push(docs1[i])
                    } else if (docs1[i].date.getDay() === 6 && docs1[i].date.getDate() === this.state.sa.getDate()) {
                        sag.push(docs1[i])
                    }
                }
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

        let data = this.state.sa
        data.setDate(data.getDate() + 8)
        this.setState({ do: data })
        this.componentDidMount()

    }

    diaAnterio = () => {
        let data = this.state.sa
        data.setDate(data.getDate() - 8)
        this.setState({ do: data })
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
                        {/*    <Text style={styles.textDia} >{moment(this.state.dataAtual).locale('pt-br').format('D')}</Text> */}
                        <Text style={styles.textMes} >{moment(this.state.qa).locale('pt-br').format('MMMM')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botaoPass} onPress={this.proximoDia}>
                        <Icon name='angle-right' size={24} color="#FFF"> </Icon>
                    </TouchableOpacity>

                </View>

                <View style={styles.diasSemana}>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.do.getDate()}</Text>
                        <Text style={styles.textSemana}> Dom </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.s.getDate()}</Text>
                        <Text style={styles.textSemana}> Seg </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.t.getDate()} </Text>
                        <Text style={styles.textSemana}> Ter </Text>
                    </View>

                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.qa.getDate()}</Text>
                        <Text style={styles.textSemana}> Qua </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.qi.getDate()}</Text>
                        <Text style={styles.textSemana}> Qui </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.se.getDate()}</Text>
                        <Text style={styles.textSemana}> Sex </Text>
                    </View>
                    <View style={styles.diaEsemana}>
                        <Text style={styles.dia}> {this.state.sa.getDate()}</Text>
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
        marginTop: 20,
        backgroundColor: "#21409a",
        fontSize: 16,
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
        borderRadius: 7,
        width: 20,
        justifyContent: 'center',
        marginHorizontal: 14,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
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
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})