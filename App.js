import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from 'react-dom';
import Accueil from './components/Accueil';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';

const AccueilStack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <AccueilStack.Navigator>
        <AccueilStack.Screen name="Connexion" component={Connexion} options={{ title: 'Connexion', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
        <AccueilStack.Screen name="Accueil" component={Accueil} options={{ title: 'Accueil', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
        <AccueilStack.Screen name="Inscription" component={Inscription} options={{ title: 'Inscription', headerTintColor: 'white', headerStyle: { backgroundColor: '#6D071A' } }} />
      </AccueilStack.Navigator>
    </NavigationContainer>
  );
}