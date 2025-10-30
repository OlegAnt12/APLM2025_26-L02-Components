// src/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Note = {
  id: string;
  title: string;
  content: string;
  timestamp: number;
};

export type RootStackParamList = {
  ListNotes: undefined;
  CreateNote: undefined; 
  ReadNote: { noteId: string }; 
};

export type ListNotesProps = NativeStackScreenProps<RootStackParamList, 'ListNotes'>;
export type CreateNoteProps = NativeStackScreenProps<RootStackParamList, 'CreateNote'>;
export type ReadNoteProps = NativeStackScreenProps<RootStackParamList, 'ReadNote'>;