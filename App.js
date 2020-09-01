import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import Accueil from './components/Accueil';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';

export default function App() {

    return (
      <Accueil/>
    );
}