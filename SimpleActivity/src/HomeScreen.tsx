import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, Platform, BackHandler } from 'react-native';
import * as Updates from 'expo-updates';
import Toast from 'react-native-root-toast'; 
// Importa os tipos necessários para tipar a navegação
import { NativeStackScreenProps } from '@react-navigation/native-stack'; 

// 1. Define a lista de rotas localmente
type RootStackParamList = {
  Home: undefined; 
  // Adicione outras rotas aqui conforme a necessidade (ex: Detail: { noteId: string };)
};
// 2. Define o tipo de props da tela Home
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// Função para simular o "Encerrar" (finish())
const finishApp = async () => {
    // ... (Mantenha a lógica finishApp) ...
    if (Platform.OS === 'web') {
      alert("Encerrar A aplicação não pode ser encerrada na web.");
        console.log("Encerrar", "A aplicação não pode ser encerrada na web.");
        BackHandler.exitApp();
    } else {
        alert("Encerrar A aplicação não pode ser encerrada na web.");
        console.log("Encerrar", "A aplicação não pode ser encerrada na web.");
        BackHandler.exitApp();
      try {
        console.log("Chamada finish(): Reiniciando a aplicação.");
        await Updates.reloadAsync(); 
      } catch (e) {
        console.log("Não foi possível reiniciar.");
      }
    }
    BackHandler.exitApp();
};


// Aplica o tipo HomeScreenProps diretamente na desestruturação
const HomeScreen = ({ navigation }: HomeScreenProps) => { 
  const TAG = "MainActivity";

  // Simula o onCreate e onStart
  useEffect(() => {
    console.log(`${TAG}: onCreate/onStart - Componente Montado.`);
    
    // Simula o onPause, onStop e onDestroy
    return () => {
      console.log(`${TAG}: onPause/onStop/onDestroy - Componente Desmontado.`);
    };
  }, []); 

  // Simula o onResume
  useEffect(() => {
    console.log(`${TAG}: onResume - Componente Focado/Ativo.`);
    
    // Adicionar o Toast no onResume
    Toast.show('onResume - Tela Ativa!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
  }, [navigation]); // Depende da navegação para simular o foco da tela

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>Tela Principal (MainActivity)</Text>
      <Button
        title="Encerrar"
        onPress={finishApp}
      />
    </View>
  );
};

export default HomeScreen;