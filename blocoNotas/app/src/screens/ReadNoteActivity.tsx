// src/screens/ReadNoteActivity.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReadNoteProps, Note } from '../types';

interface ReadNoteActivityProps extends ReadNoteProps {
    notes: Note[]; // Recebe o array de notas para procurar
}

const ReadNoteActivity: React.FC<ReadNoteActivityProps> = ({ route, notes }) => {
    // Obtém o ID da nota a partir dos parâmetros de rota
    const { noteId } = route.params; 
    
    // Procura a nota no estado
    const note = notes.find(n => n.id === noteId);

    // Se o utilizador pressionar o botão VOLTAR, a actividade é encerrada[cite: 94].
    // O botão VOLTAR é gerido automaticamente pelo Stack Navigator.

    if (!note) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erro: Nota não encontrada.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Mostra o título e o conteúdo dessa nota [cite: 93] */}
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <Text style={styles.noteFooter}>Criada em: {new Date(note.timestamp).toLocaleDateString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: 'white' },
    noteTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
    noteContent: { fontSize: 18, lineHeight: 28, flex: 1 },
    noteFooter: { fontSize: 12, color: '#999', marginTop: 20, textAlign: 'right' },
    errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 50 }
});

export default ReadNoteActivity;