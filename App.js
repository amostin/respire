import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import Accueil from './components/Accueil';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';

const AccueilStack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('userId');
    if (value !== null) {
      this.setState({ isSignedIn: true });
      console.log(value);
    }
  }

  render() {
    return (
      this.state.isSignedIn ? (
        <NavigationContainer>
          <AccueilStack.Navigator>
            <AccueilStack.Screen name="Accueil" component={Accueil} options={{ title: 'Accueil', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
          </AccueilStack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AccueilStack.Navigator>
            <AccueilStack.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
            <AccueilStack.Screen name="Inscription" component={Inscription} options={{ title: 'Inscription', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
          </AccueilStack.Navigator>
        </NavigationContainer>
      )
    );
  }
}

export default App