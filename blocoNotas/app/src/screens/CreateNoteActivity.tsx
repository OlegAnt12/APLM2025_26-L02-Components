// src/screens/CreateNoteActivity.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CreateNoteProps, Note } from '../types';

// Extendemos as props para incluir a callback
interface CreateNoteActivityProps extends CreateNoteProps {
  onSaveNote: (note: Note) => void;
}

const CreateNoteActivity: React.FC<CreateNoteActivityProps> = ({ navigation, onSaveNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Título e conteúdo não podem estar vazios.");
      return;
    }
    
    const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        timestamp: Date.now(),
    };

    // Chama a função passada via props para salvar a nota
    onSaveNote(newNote);
    
    // Volta para a lista de notas
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Título da Nota:</Text>
        <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título aqui"
        />

        <Text style={styles.label}>Conteúdo da Nota:</Text>
        <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Digite o conteúdo principal aqui"
            multiline
        />

        <View style={styles.buttonGroup}>
            <Button title="OK" onPress={handleSaveNote} />
            <Button title="Cancel" onPress={handleCancel} color="#dc3545" />
        </View>
    </View>
  );
};

// ... (styles permanecem os mesmos)
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: '600' },
    titleInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 18 },
    contentInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16, height: 200, textAlignVertical: 'top' },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
});

export default CreateNoteActivity;