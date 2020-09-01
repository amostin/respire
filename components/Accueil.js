import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';


class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbTaffTotal: 0,
            nbTaffAjd: 0,
            bestScore: 0
        }
    }

    ajoutTabac = () => {
        fetch('https://respire.ambroisemostin.com/controller/ajoutTabacController.php', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                type: 'tabac',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert('ok bdd');
                console.log('yalaaa');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ajoutOrtie = () => {
        fetch('https://respire.ambroisemostin.com/controller/ajoutTabacController.php', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                type: 'ortie',
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert('ok bdd');
                console.log('yalaaa');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getTaff = () => {
        fetch('https://respire.ambroisemostin.com/controller/getTotalController.php', {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({ nbTaffTotal: responseJson.length });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getTaffAjd = () => {
        fetch('https://respire.ambroisemostin.com/controller/getAjdController.php', {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                this.setState({ nbTaffAjd: responseJson.length });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getBestScore = () => {
        fetch('https://respire.ambroisemostin.com/controller/getBestScoreController.php', {
            method: 'GET',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var lowest = Number.POSITIVE_INFINITY;
                var highest = Number.NEGATIVE_INFINITY;
                var tmp;
                for (let i = responseJson.length - 1; i >= 0; i--) {
                    tmp = responseJson[i]["0"];
                    if (tmp < lowest) lowest = tmp;
                    if (tmp > highest) highest = tmp;
                }
                this.setState({ bestScore: highest });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />

                    <View>
                        <TouchableOpacity style={styles.submitContainer}
                            onPress={() => this.ajoutTabac()}>
                            <Text style={styles.submitButton}>TABAC</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.submitContainer}
                            onPress={() => this.ajoutOrtie()}>
                            <Text style={styles.submitButton}>ORTIE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTitre}>
                        <TouchableOpacity
                            onPress={() => this.getTaffAjd()}>
                            <Text style={styles.titrePage}>Nombre de geste aujourd'hui: {this.state.nbTaffAjd}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTitre}>
                        <TouchableOpacity
                            onPress={() => this.getTaff()}>
                            <Text style={styles.titrePage}>Nombre de geste total: {this.state.nbTaffTotal}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerTitre}>
                        <TouchableOpacity
                            onPress={() => this.getBestScore()}>
                            <Text style={styles.titrePage}>Best score: {this.state.bestScore}</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitContainer: {
        backgroundColor: "#6D071A",
        borderRadius: 25,
        marginVertical: 10,
    },
    submitButton: {
        width: 100,
        borderRadius: 25,
        paddingVertical: 13,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    titrePage: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center'
    },
    containerTitre: {
        backgroundColor: '#3A4750',
        flexDirection: 'row',
        height: 60
    },
});


export default Accueil;