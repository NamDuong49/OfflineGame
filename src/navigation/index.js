import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Wordle from '../screens/Wordle';
import TicTocToe from '../screens/TicTocToe';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeScreen" component={HomeScreen}/>
          <Stack.Screen name="Wordle" component={Wordle}/>
          <Stack.Screen name="TicTocToe" component={TicTocToe}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation