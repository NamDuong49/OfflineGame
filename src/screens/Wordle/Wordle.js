import React, {useEffect, useState} from 'react';
 import {Text, View, StyleSheet, ScrollView, Alert, TouchableOpacity, SafeAreaView} from 'react-native';
 import {colors,CLEAR, ENTER} from '../../components/constants';
 import Keyboard from '../../components/Keyboard/Keyboard';
 import * as words from '../../../assets/word_list.json'
 
 const NUMBER_OF_TRIES = 6;
 const copyArray = (arr) => {
   return [...arr.map((rows) => [...rows])];
 };

const Wordle = () => {
    const onNextPressed = () => {
        setWord(words[Math.floor(Math.random()*Object.values(words).length)]);
        setCurRow(0);
        // console.log(word);
        setCurCol(0);
        setGameState('playing');
        setCompleteWord('');
      }
      
    
      const [word, setWord] = useState(words[Math.floor(Math.random()*Object.values(words).length)]);
    
      const letters = word.split('');
    
      const [rows, setRows] = useState(new Array(NUMBER_OF_TRIES).fill(
        new Array(letters.length).fill('')
      ));
    
      useEffect(() => {
        setRows(new Array(NUMBER_OF_TRIES).fill(
          new Array(word.length).fill('')
        ));
      }, [word])
    
      const [curRow, setCurRow] = useState(0);
      const [curCol, setCurCol] = useState(0);
      const [gameState, setGameState] = useState('playing');
      const [completeWord, setCompleteWord] = useState("");
      useEffect(() => {
        if (curRow > 0){
          checkGameState();
        }
      }, [curRow])
       const checkGameState = () => {
         if (checkIfWon() && gameState != 'won') {
           Alert.alert("Hurray","You won!");
           setGameState('won');
         } else if (checkIfLost() && gameState != 'lost'){
           Alert.alert("Ehhhh","The word is " +word);
           setGameState('lost');
         }
       };
       const checkIfWon = () => {
         const row = rows[curRow - 1];
         return row.every((letter, i) => letter == letters[i]);
       }
       const checkIfLost =() => {
         return !checkIfWon() && curRow == rows.length;
       }
       const onKeyPressed = (key) => {
         if (gameState != 'playing'){
           return;
         }
         const updateRows = copyArray(rows);
         if (key == CLEAR){
           const prevCol = curCol - 1;
           setCompleteWord(completeWord.slice(0, -1));
           if (prevCol >= 0){
             updateRows[curRow][prevCol] = "";
             setRows(updateRows);
             setCurCol(prevCol);
           }
           return;
         }
         if (key == ENTER){
           if (curCol == rows[0].length){
            const a = Object.values(words).includes(completeWord);
            if (a == true) {
              setCurRow(curRow + 1);
              setCurCol(0);
              setCompleteWord('');
            } else {
              Alert.alert("Can not found English word");
            };
           }
           return;
         }
    
         if (curCol < rows[0].length){
           updateRows[curRow][curCol] = key;
           setCompleteWord(completeWord+key);
           setRows(updateRows);
           setCurCol(curCol+1);
         }
       }
       const isCellActive = (row, col) => {
         return row == curRow && col == curCol;
       }
       const getCellBGColor = (row, col) => {
         const letter = rows[row][col];
         if (row >= curRow) {
           return colors.black;
         }
         if (letter == letters[col]){
           return colors.primary;
         }
         if (letters.includes(letter)){
           return colors.secondary;
         }
         return colors.darkgrey;
       }
       const getAllLettersWithColor = (color) => {
         return rows.flatMap((row, i) =>
           row.filter((cell,j) => getCellBGColor(i,j) == color)
         );
       }
       const greenCaps = getAllLettersWithColor(colors.primary);
       const yellowCaps = getAllLettersWithColor(colors.secondary);
       const greyCaps = getAllLettersWithColor(colors.darkgrey);
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.view}>
        <Text style = {styles.title}>WORDLE</Text>
        <TouchableOpacity style = {styles.button} onPress={onNextPressed}>
            <Text style = {styles.textButton}>Next game</Text>
        </TouchableOpacity>
     </View>
     
       <ScrollView style = {styles.map}>
         {rows.map((row, i) => (
           <View key={`row-${i}`} style = {styles.row}>
             {row.map((letter, j) => (
               <View
                 key={`cell-${i}-${j}`} 
                 style = {[styles.cell, 
                 {
                   borderColor: isCellActive(i, j) 
                   ? colors.lightgrey 
                   : colors.darkgrey,
                   backgroundColor: getCellBGColor(i, j),
                 }]}>
                 <Text style = {styles.cellText}>{letter.toUpperCase()}</Text>
               </View>
             ))}
           </View>
         ))}
       </ScrollView>
       <Keyboard
         onKeyPressed={onKeyPressed}
         greenCaps={greenCaps}
         yellowCaps={yellowCaps}
         greyCaps = {greyCaps}
       />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.black,
      alignItems: 'center',
    },
    map: {
        marginVertical: 10,
        alignSelf: 'stretch',
      }, row: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
      }, cell: {
        borderWidth: 3,
        borderColor: colors.darkgrey,
        maxWidth: 75,
        flex: 1,
        aspectRatio: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center'
      }, cellText: {
        color: colors.lightgrey,
        fontWeight:'bold',
        fontSize: 25,
      },
      title: {
       color: colors.lightgrey,
       fontSize: 37,
       fontWeight: 'bold',
       letterSpacing: 6,
     }, 
     button: {
       backgroundColor: '#4e6ec2',
       width: 120,
       borderRadius: 6,
       marginLeft: 65,
       alignItems: 'center',
       justifyContent: 'center'
     },
     view: {
       flexDirection: 'row',
     },
     textButton: {
       fontSize: 18,
       fontWeight: 'bold',
     }
})

export default Wordle