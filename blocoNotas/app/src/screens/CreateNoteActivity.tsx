// src/screens/CreateNoteActivity.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CreateNoteProps, Note } from '../types';

const CreateNoteActivity: React.FC<CreateNoteProps> = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Simulação de retorno de dados para a tela ListNotes usando params
  // Em uma aplicação real, isto usaria Context/Redux ou um callback

  const handleSaveNote = () => {
    if (!title.trim() || !content.trim()) {
      alert("Título e conteúdo não podem estar vazios.");
      return;
    }
    
    // Simulação do resultado (a lista de notas será atualizada no App.tsx)
    const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        timestamp: Date.now(),
    };

    // A nova nota é aceita e a lista é atualizada.
    // Note: Usamos navigate com merge: true para enviar o dado de volta.
    // O ListNotesActivity precisa ser re-renderizado para ver a mudança.
    navigation.navigate('ListNotes', { 
        // @ts-ignore: Passando o objeto complexo via params.
        newNote: newNote 
    });
  };

  const handleCancel = () => {
    // Pressionar Cancel encerra a atividade, a nota é descartada.
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Título da Nota:</Text>
        {/* Visão para digitar o título da nota [cite: 91] */}
        <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título aqui"
        />

        <Text style={styles.label}>Conteúdo da Nota:</Text>
        {/* Visão para digitar o texto da nota [cite: 91] */}
        <TextInput
            style={styles.contentInput}
            value={content}
            onChangeText={setContent}
            placeholder="Digite o conteúdo principal aqui"
            multiline
        />

        <View style={styles.buttonGroup}>
            {/* Botão OK para aceitar a nota [cite: 91] */}
            <Button title="OK" onPress={handleSaveNote} />
            {/* Botão Cancel para cancelar a nota [cite: 91] */}
            <Button title="Cancel" onPress={handleCancel} color="#dc3545" />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: '600' },
    titleInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 18 },
    contentInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16, height: 200, textAlignVertical: 'top' },
    buttonGroup: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
});

export default CreateNoteActivity;