// src/types.ts

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: number;
};

// 1. Crie um tipo explícito para os parâmetros da rota ListNotes
export type ListNotesParams = {
  newNote?: Note; // Torna 'newNote' opcional
};

// 2. Use este tipo na definição das rotas (sem o '| undefined')
export type RootStackParamList = {
  // Agora, TypeScript entende que o parâmetro é um objeto parcial
  ListNotes: ListNotesParams; 
  
  CreateNote: undefined; 
  ReadNote: { noteId: string }; 
};

// 2. Tipos de Props de Navegação para cada tela
export type ListNotesProps = NativeStackScreenProps<RootStackParamList, 'ListNotes'>;
export type CreateNoteProps = NativeStackScreenProps<RootStackParamList, 'CreateNote'>;
export type ReadNoteProps = NativeStackScreenProps<RootStackParamList, 'ReadNote'>;