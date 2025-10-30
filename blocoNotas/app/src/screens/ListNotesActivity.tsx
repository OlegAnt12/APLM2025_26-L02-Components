// src/screens/ListNotesActivity.tsx
import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ListNotesProps, Note } from '../types';

interface ListNotesActivityProps extends ListNotesProps {
  notes: Note[];
  onAddNote: (note: Note) => void; // Nova prop para adicionar notas
}

const ListNotesActivity: React.FC<ListNotesActivityProps> = ({ navigation, notes, onAddNote }) => {
  
  const handleNotePress = (noteId: string) => {
    navigation.navigate('ReadNote', { noteId });
  };

  const handleNewNotePress = () => {
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
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteTimestamp}>
              Criada em: {new Date(item.timestamp).toLocaleDateString()} às {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma nota encontrada. Crie uma!</Text>
          </View>
        )}
      />

      <View style={styles.newNoteButton}>
        <Button 
          title="New Note" 
          onPress={handleNewNotePress}
        />
      </View>
    </View>
  );
};

// ... (styles permanecem os mesmos)
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    noteItem: { padding: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
    noteTitle: { fontSize: 18, fontWeight: '600' },
    noteTimestamp: { fontSize: 12, color: '#999', marginTop: 5 },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    newNoteButton: { marginTop: 20 },
    // ... (styles anteriores),
    emptyContainer: {
        marginTop: 50,
        alignItems: 'center',
    }
});

export default ListNotesActivity;