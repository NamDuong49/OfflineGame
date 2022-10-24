import { View, Text, ImageBackground, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import main from '../../../assets/images/main.png'
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  const onWordlePressed = () => {
    navigation.navigate('Wordle')
  }
  const onTicTocToePressed = () => {
    navigation.navigate('TicTocToe')
  }
  return (
    <View>
      <ImageBackground source = {main} style = {styles.main} >
        <Text style = {styles.title}>
          SUNNY GAMES
        </Text>
        <TouchableOpacity style = {styles.touch} onPress={onWordlePressed}>
          <Text style = {styles.game}>
            WORDLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity  style = {styles.touch} onPress={onTicTocToePressed}>
          <Text style = {styles.game}>
            Tic Tac Toe
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: "100%",
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#b70000',
    marginBottom: 150,
    marginTop: 120,
  }, 
  touch: {
    backgroundColor: '#0bbd54',
    width: 300,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 50,
  },
  game: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#e6ec0d'
  } 
})

export default HomeScreen