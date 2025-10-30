// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Note } from './src/types'; 

import ListNotesActivity from './src/screens/ListNotesActivity';
import CreateNoteActivity from './src/screens/CreateNoteActivity';
import ReadNoteActivity from './src/screens/ReadNoteActivity';

const Stack = createNativeStackNavigator<RootStackParamList>();
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

export default function Index() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

  // Função para adicionar nota
  const addNote = (newNote: Note) => {
    setNotes(prev => [newNote, ...prev]);
  };

  return (

      <Stack.Navigator initialRouteName="ListNotes">
        
        {/* ListNotesActivity */}
        <Stack.Screen name="ListNotes">
          {(props) => (
            <ListNotesActivity 
              {...props} 
              notes={notes} 
              onAddNote={addNote} // Passa a função como prop
            />
          )}
        </Stack.Screen>

        {/* CreateNoteActivity */}
        <Stack.Screen name="CreateNote">
          {(props) => (
            <CreateNoteActivity 
              {...props} 
              onSaveNote={addNote} // Passa a função como prop
            />
          )}
        </Stack.Screen>
        
        {/* ReadNoteActivity */}
        <Stack.Screen name="ReadNote" options={{ title: 'Ler Nota' }}>
          {(props) => <ReadNoteActivity {...props} notes={notes} />}
        </Stack.Screen>

      </Stack.Navigator>
  );
}