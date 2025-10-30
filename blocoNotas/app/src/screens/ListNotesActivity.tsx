// src/screens/ListNotesActivity.tsx

import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListNotesProps, Note } from '../types';

// Propriedades estendidas para a tela ListNotes (incluindo o estado de App.tsx)
interface ListNotesActivityProps extends ListNotesProps {
  notes: Note[];
  // A função de adicionar nota é passada do App.tsx para esta tela, mas 
  // a lógica de adicionar é acionada após o retorno de CreateNote.
}

const ListNotesActivity: React.FC<ListNotesActivityProps> = ({ navigation, notes }) => {
  
  // Função para navegar para a leitura
  const handleNotePress = (noteId: string) => {
    // Pressionar o título da nota resulta na criação de uma nova atividade (ReadNoteActivity)[cite: 93].
    navigation.navigate('ReadNote', { noteId });
  };

  // Função para navegar para a criação
  const handleNewNotePress = () => {
    // Pressionar "New Note" cria a CreateNoteActivity[cite: 90].
    navigation.navigate('CreateNote');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas Existentes</Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotePress(item.id)} style={styles.noteItem}>
            {/* Apresenta os títulos das notas existentes  */}
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteTimestamp}>Criada em: {new Date(item.timestamp).toLocaleTimeString()}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma nota encontrada. Crie uma!</Text>}
      />

      {/* Botão para criar uma nova nota [cite: 83] */}
      <View style={styles.newNoteButton}>
        <Button 
          title="New Note" 
          onPress={handleNewNotePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    noteItem: { padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    noteTitle: { fontSize: 18, fontWeight: '600' },
    noteTimestamp: { fontSize: 12, color: '#999', marginTop: 5 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    newNoteButton: { marginTop: 20 }
});

export default ListNotesActivity;