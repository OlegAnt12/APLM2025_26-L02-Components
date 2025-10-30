// App.tsx

import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Importamos o novo tipo ListNotesParams
import { RootStackParamList, Note, ListNotesParams } from './src/types'; 

// Importa as telas (Activities)
import ListNotesActivity from './src/screens/ListNotesActivity';
import CreateNoteActivity from './src/screens/CreateNoteActivity';
import ReadNoteActivity from './src/screens/ReadNoteActivity';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  // Tipamos o ref para o nosso RootStackParamList
  const navigationRef = useNavigationContainerRef<RootStackParamList>(); 

  // Hook para verificar a rota atual e buscar novos parâmetros (nova nota salva)
  useEffect(() => {
    // Adicionamos navigationRef como dependência para garantir o correto unsubscribe
    const unsubscribe = navigationRef.addListener('state', () => {
      
      const currentRoute = navigationRef.getCurrentRoute();
      
      // Apenas processamos se a rota atual for ListNotes
      if (currentRoute?.name === 'ListNotes') {
          
          // O TypeScript agora sabe que 'params' é do tipo ListNotesParams
          const params = currentRoute.params as ListNotesParams | undefined;
          const newNote = params?.newNote; 
          
          if (newNote) {
            // 1. Atualiza o estado das notas
            setNotes(prev => [newNote, ...prev]);
            
            // 2. Limpa o parâmetro de rota. 
            // Usamos a asserção 'as ListNotesParams' para resolver o erro persistente.
            navigationRef.setParams({ newNote: undefined } as ListNotesParams); 
          }
      }
    });

    return unsubscribe;
  }, [navigationRef, notes.length]); // Dependências adicionadas

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="ListNotes">
        
        {/* ListNotesActivity */}
        <Stack.Screen name="ListNotes">
          {(props) => <ListNotesActivity {...props} notes={notes} />}
        </Stack.Screen>

        {/* CreateNoteActivity */}
        <Stack.Screen 
          name="CreateNote" 
          component={CreateNoteActivity} 
          options={{ title: 'Criar Nova Nota' }}
        />
        
        {/* ReadNoteActivity */}
        <Stack.Screen name="ReadNote" options={{ title: 'Ler Nota' }}>
          {(props) => <ReadNoteActivity {...props} notes={notes} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}