// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { RootStackParamList, Note } from './src/types'; 
import ListNotesActivity from './src/screens/ListNotesActivity';
import CreateNoteActivity from './src/screens/CreateNoteActivity';
import ReadNoteActivity from './src/screens/ReadNoteActivity';

const Stack = createNativeStackNavigator<RootStackParamList>();
const STORAGE_KEY = '@notes_app_data';

const INITIAL_NOTES: Note[] = [
  {
    id: '1',
    title: 'Primeira Reunião',
    content: 'Reunião de alinhamento do projeto L02. Focar em React Native e tipagem.',
    timestamp: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Lembrete: Comprar café',
    content: 'Urgente: o escritório está sem café.',
    timestamp: Date.now() - 3600000,
  },
];

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar notas do AsyncStorage ao iniciar o app
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes(INITIAL_NOTES);
        await saveNotesToStorage(INITIAL_NOTES);
      }
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
      setNotes(INITIAL_NOTES);
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar notas no AsyncStorage
  const saveNotesToStorage = async (notesToSave: Note[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notesToSave));
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
    }
  };

  // Função para adicionar nota
  const addNote = async (newNote: Note) => {
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    await saveNotesToStorage(updatedNotes);
  };

  // Se ainda está carregando, mostra loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando notas...</Text>
      </View>
    );
  }

  return (
      <Stack.Navigator initialRouteName="ListNotes">
        
        {/* ListNotesActivity - APENAS notes, sem onAddNote */}
        <Stack.Screen 
          name="ListNotes" 
          options={{ title: 'Minhas Notas' }}
        >
          {(props) => (
            <ListNotesActivity 
              {...props} 
              notes={notes} 
              // Remove onAddNote daqui
            />
          )}
        </Stack.Screen>

        {/* CreateNoteActivity - passa onSaveNote */}
        <Stack.Screen 
          name="CreateNote" 
          options={{ title: 'Criar Nova Nota' }}
        >
          {(props) => (
            <CreateNoteActivity 
              {...props} 
              onSaveNote={addNote}
            />
          )}
        </Stack.Screen>
        
        {/* ReadNoteActivity - apenas notes */}
        <Stack.Screen 
          name="ReadNote" 
          options={{ title: 'Ler Nota' }}
        >
          {(props) => <ReadNoteActivity {...props} notes={notes} />}
        </Stack.Screen>

      </Stack.Navigator>
  );
}