import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
// Módulo que atua como o "Broadcast Receiver" (Recetor de Transmissão)
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

// =========================================================================
// Componente Principal (Simulação da Activity com o Receiver)
// =========================================================================

export default function Index() { //BroadcastReceiverScreen
  const TAG = "NetworkChangeReceiver";
  const [connectionStatus, setConnectionStatus] = useState<string>("Verificando...");
  const [details, setDetails] = useState<string>("Aguardando o primeiro evento...");
  
  // O useEffect atua como o registration/unregistration do Receiver
  useEffect(() => {
    console.log(`${TAG}: Receiver Registrado (useEffect Montado)`);

    // ====================================================================
    // 1. Simulação do Broadcast Receiver: Assinando o Listener de Eventos
    // ====================================================================
    
    // A função .addEventListener atua como o método onReceive() do Broadcast Receiver.
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      
      const isConnected = state.isConnected === true;
      const connectionType = state.type;

      const status = isConnected 
        ? `CONECTADO (${connectionType.toUpperCase()})` 
        : "DESCONECTADO";
      
      const detailString = `Detalhes: Tipo=${connectionType} | Internet Acessível=${state.isInternetReachable ? 'Sim' : 'Não'}`;
      
      // 2. Lógica de Reação ao Evento (onReceive)
      console.log(`${TAG}: Evento Recebido! Novo Estado: ${status}`);
      
      // Notificação visual para o utilizador
      alert(`NETWORK BROADCAST, O estado da rede mudou para: ${status}`);

      // Atualiza o estado da UI (Simulação da Activity a ser notificada)
      setConnectionStatus(status);
      setDetails(detailString);
    });

    // ====================================================================
    // 3. Simulação do Unregistration do Receiver
    // ====================================================================
    
    // A função de retorno do useEffect é chamada na desmontagem do componente
    return () => {
      console.log(`${TAG}: Receiver Desregistrado (useEffect Desmontado)`);
      unsubscribe(); // Remove o listener de evento
    };
  }, []); // Array vazio garante que o registro/desregistro ocorra apenas uma vez

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercício III: Broadcast Receiver</Text>
      <Text style={styles.subtitle}>Monitoramento de Conexão de Rede (Simulado)</Text>

      <Text style={styles.statusLabel}>ESTADO ATUAL DA REDE:</Text>
      <Text style={[styles.statusValue, connectionStatus.includes('CONECTADO') ? styles.connected : styles.disconnected]}>
        {connectionStatus}
      </Text>
      
      <Text style={styles.details}>{details}</Text>

      <View style={styles.hintContainer}>
        <Text style={styles.hintTitle}>Como Testar:</Text>
        <Text style={styles.hintText}>
          No seu dispositivo ou emulador, desative e volte a ativar o Wi-Fi ou os Dados Móveis. 
          Você verá o alerta "NETWORK BROADCAST" e os logs no console, simulando a atuação do Receiver.
        </Text>
      </View>
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
    marginBottom: 40,
    color: '#6c757d',
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#343a40',
  },
  statusValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  connected: {
    color: '#28a745',
    backgroundColor: '#d4edda',
  },
  disconnected: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
  },
  details: {
    marginTop: 15,
    fontSize: 14,
    color: '#6c757d',
  },
  hintContainer: {
    marginTop: 40,
    padding: 15,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    backgroundColor: '#e9f7ff',
  },
  hintTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hintText: {
    fontSize: 13,
    lineHeight: 18,
  }
});