import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave única para o contador no AsyncStorage (Estado Não Volátil Compartilhado)
const STORAGE_KEY = '@my_background_counter';

// =========================================================================
// Funções de Persistência (Simulação do Acesso ao Estado pelo Service e UI)
// =========================================================================

/**
 * Lê o valor atual do contador do AsyncStorage.
 * @returns {number} O valor do contador ou 0.
 */
const getCounter = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value !== null ? parseInt(value) : 0;
  } catch (e) {
    console.error("Erro ao ler o contador:", e);
    return 0;
  }
};

/**
 * Incrementa e salva o contador no AsyncStorage.
 */
const incrementCounter = async () => {
  try {
    const current = await getCounter();
    const newValue = current + 1;
    await AsyncStorage.setItem(STORAGE_KEY, newValue.toString());
    console.log(`[SERVICE LOG] Contador incrementado para: ${newValue}`);
  } catch (e) {
    console.error("Erro ao escrever o contador:", e);
  }
};

// =========================================================================
// Componente Principal
// =========================================================================

export default function Index() {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  // Usamos useRef para armazenar o ID do intervalo, simulando o Service em Background
  const serviceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega o valor inicial do contador na montagem
  useEffect(() => {
    refreshUI();
  }, []);

  // Lógica para iniciar o Serviço (o contador)
  const startService = () => {
    if (serviceIntervalRef.current) {
      // Já está a correr
      return;
    }

    Alert.alert("Serviço Iniciado", "O contador está agora a correr em background (simulado via setInterval)!");
    
    // Simula o Service: Roda a cada 2 segundos, atualizando o AsyncStorage
    serviceIntervalRef.current = setInterval(incrementCounter, 2000);
    setIsRunning(true);
  };

  // Lógica para parar o Serviço
  const stopService = () => {
    if (serviceIntervalRef.current) {
      clearInterval(serviceIntervalRef.current);
      serviceIntervalRef.current = null;
      setIsRunning(false);
      Alert.alert("Serviço Parado", "O contador foi interrompido.");
    }
  };

  // Função para atualizar a UI lendo o estado Não Volátil
  const refreshUI = async () => {
    const currentCount = await getCounter();
    setDisplayCount(currentCount);
    console.log(`[UI LOG] Valor lido do AsyncStorage: ${currentCount}`);
  };

  // Limpeza: Garante que o intervalo para quando o componente é desmontado (onDestroy)
  useEffect(() => {
    return () => {
      if (serviceIntervalRef.current) {
        clearInterval(serviceIntervalRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulação de Service (Exercício II)</Text>
      <Text style={styles.subtitle}>Estado Compartilhado via AsyncStorage</Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusText}>Estado do Serviço: {isRunning ? 'A Correr' : 'Parado'}</Text>
      </View>
      
      <Text style={styles.counterLabel}>Valor Atual do Contador (Lido pela UI):</Text>
      <Text style={styles.counterValue}>{displayCount}</Text>

      <View style={styles.buttonGroup}>
        <Button 
          title="Iniciar Serviço (Background)" 
          onPress={startService} 
          disabled={isRunning}
        />
        <Button 
          title="Parar Serviço" 
          onPress={stopService} 
          disabled={!isRunning}
          color="#dc3545"
        />
      </View>
      
      <View style={styles.refreshButton}>
        <Button 
          title="Atualizar UI (Ler do AsyncStorage)" 
          onPress={refreshUI} 
          color="#007bff"
        />
      </View>

      <Text style={styles.hint}>
        Nota: Clique em "Atualizar UI" para ver a contagem subir enquanto o Serviço está a correr.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#6c757d',
  },
  statusBox: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  counterLabel: {
    fontSize: 16,
    marginTop: 20,
    color: '#343a40',
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007bff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  refreshButton: {
    marginTop: 20,
    width: '100%',
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#6c757d',
  }
});