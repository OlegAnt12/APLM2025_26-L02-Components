import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen'; 
// Note: Não há import de './src/types'

// 1. RE-DEFINE a lista de rotas (necessário já que não há types.ts)
type RootStackParamList = {
  Home: undefined; 
};

// Diga ao Stack Navigator qual é o seu RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Simple Activity' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}