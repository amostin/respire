import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Image, AsyncStorage, ScrollView } from "react-native";

class Connexion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserEmail: '',
            UserName: '',
            UserPassword: '',
            user_name: '',
            UserId: '',

        }
    }
    login = () => {
        const { UserEmail, UserPassword, UserName } = this.state;
        if (UserName == "") {
            alert("Entrez un pseudo");
        }

        else if (UserPassword == "") {
            alert("Entrez votre mot de passe.");
        }

        else {
            fetch('https://managis.ambroisemostin.com/controller/connexionController.php', {
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({

                    email: UserEmail,
                    pseudo: UserName,
                    passwd: UserPassword,

                })

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson[0] == "ok") {


                        this.props.navigation.navigate("Profil");

                        //Je crée la session ici et j'attribue des valeurs retournées par User_Login.php
                        AsyncStorage.setItem('UserId', responseJson[1]);
                        AsyncStorage.setItem('UserEmail', responseJson[2]);
                        AsyncStorage.setItem('UserName', responseJson[3]);

                    } else {
                        alert("Mot de passe ou adresse mail incorrect!");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    //pas l'air de servir a grand chose...
    get_Response_Info = (error, result) => {
        if (error) {
            Alert.alert('Error fetching data: ' + error.toString());
        } else {
            this.setState({ user_name: 'Welcome' + ' ' + result.name });
            console.log(result);
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />

                    <TextInput
                        style={styles.inputBox}
                        placeholder="Pseudo"
                        underlineColorAndroid="transparent"
                        onChangeText={UserName => this.setState({ UserName })}
                        placeholderTextColor='#FFFFFF'
                    />

                    <TextInput
                        style={styles.inputBox}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        placeholderTextColor='#FFFFFF'
                        underlineColorAndroid="transparent"
                        onChangeText={UserPassword => this.setState({ UserPassword })}
                    />

                    <TouchableOpacity
                        onPress={this.login}
                        //onPress={() => this.props.navigation.navigate("Profil")}
                        style={styles.submitButton}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Se connecter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("Inscription")}>
                        <Text>Pas encore de compte ? Inscrivez vous !</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
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

export default Connexion