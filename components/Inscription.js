import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, ScrollView } from "react-native";

class Inscription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: '',
            email: '',
            mdp: ''
        }
    }

    inscription = () => {
        const { pseudo } = this.state;
        const { email } = this.state;
        const { mdp } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email == "") {
            alert('Entrez votre adresse mail.');
        }
        /*
                else if (reg.test(email) === false) {
                    alert("l'adresse mail entrée n'est pas correcte.");
                    return false;
                }
                */
        else if (pseudo == "") {
            alert("Entrez un pseudo");
        }
        else if (mdp == "") {
            alert("Entrez votre mot de passe.");
        }
        else {

            fetch('https://managis.ambroisemostin.com/controller/inscriptionController.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pseudo: pseudo,
                    email: email,
                    mdp: mdp,
                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson === "ok") {
                        alert('Le compte a bien été créé.');
                    } else if (responseJson === "mailPseudoPasOk") {
                        alert('Le mail et le pseudo sont déjà utilisés.');
                    } else if (responseJson === "mailPasOk") {
                        alert('Le mail est déjà utilisé.');
                    } else if (responseJson === "pseudoPasOk") {
                        alert('Le pseudo est déjà utilisé.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <View style={styles.containerTitre}>
                        <View style={{ flex: 6, justifyContent: 'center' }}>
                            <Text style={styles.titrePage}>Inscription</Text>
                        </View>
                    </View>

                    <TextInput
                        placeholder="Nom"
                        style={styles.inputBox}
                        underlineColorAndroid="transparent"
                        onChangeText={pseudo => this.setState({ pseudo })}
                        placeholderTextColor='#FFFFFF'
                    />

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='#FFFFFF'
                        style={styles.inputBox}
                        underlineColorAndroid="transparent"
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.inputBox}
                        secureTextEntry={true}
                        placeholderTextColor='#FFFFFF'
                        underlineColorAndroid="transparent"
                        onChangeText={mdp => this.setState({ mdp })}
                    />

                    <TouchableOpacity
                        onPress={this.inscription}
                        //onPress={() => this.props.navigation.navigate("Profil")}
                        style={styles.submitButton}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>S'inscrire</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Connexion")}>
                        <Text>Vous avez déjà un compte ? Connectez vous !</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 350,
        height: 300,
        margin: -50
    },
    inputBox: {
        width: 300,
        backgroundColor: '#6D071A',
        borderRadius: 25,
        paddingVertical: 12,
        fontSize: 16,
        color: '#FFFFFF',
        alignItems: 'center',
        marginVertical: 10,
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#6D071A',
        width: 100,
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    }
});

export default Inscription