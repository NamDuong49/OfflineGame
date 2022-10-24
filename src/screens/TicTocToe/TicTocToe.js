import { View, Text, ImageBackground, StyleSheet, Pressable, Alert, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import bg from '../../../assets/images/bg.jpeg'
const copyArray = (original) => {
  const copy = original.map((arr) => {
    return arr.slice();
  });
  return copy;
}
const emptyMap = [
  ["", "", ""], // 1st row
  ["", "", ""], // 2nd row
  ["", "", ""], // 3rd row
];

const TicTocToe = () => {
  const [map, setMap] = useState(emptyMap);
  const [currentTurn, setCurrentTurn] = useState("x");
  const [gameMode, setGameMode] = useState("BOT_MEDIUM");
  useEffect(() => {
    if (currentTurn == 'o' && gameMode !=='LOCAL'){
      botTurn();
    }
  },[currentTurn, gameMode])

  useEffect(() => {
    const winner = getWinner(map);
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] != ""){
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updateMap = [...existingMap];
      updateMap[rowIndex][columnIndex] = currentTurn;
      return updateMap;
    })

    setCurrentTurn(currentTurn == 'x' ? 'o' : 'x')
  };

  const botAttack = (winnerMap) => {
    //check row
    for(let row = 0; row < 3; row++){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(i != j && winnerMap[row][i] == 'o' && winnerMap[row][j] == "o" && winnerMap[row][3-i-j] == ''){
            return {winner: 'o',rowToAttack: row,colToAttack: 3-i-j};
          }
        }
      }
    }
    //check coloumn
    for(let col = 0; col < 3; col++){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(i != j && winnerMap[i][col] == 'o' && winnerMap[j][col] == "o" && winnerMap[3-i-j][col] == ''){
            return {winner: 'o',rowToAttack: 3-i-j,colToAttack: col};
          }
        }
      }
    }
    //check diagnose
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if (i != j && winnerMap[i][i] == 'o' && winnerMap[j][j] == 'o' && winnerMap[3-i-j][3-i-j] == ''){
          return {winner: 'o', rowToAttack: 3-i-j, colToAttack: 3-i-j};
        }
        if (i != j && winnerMap[i][2-i] == 'o' && winnerMap[j][2-j] == 'o' && winnerMap[3-i-j][i+j-1] == ''){
          return {winner: 'o', rowToAttack: 3-i-j, colToAttack: i+j-1};
        }
      }
    }
  return {winner: '',rowToAttack: null ,colToAttack: null}
  }

  const botDefend = (winnerMap) => {
    //check row
    for(let row = 0; row < 3; row++){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(i != j && winnerMap[row][i] == 'x' && winnerMap[row][j] == "x" && winnerMap[row][3-i-j] == ''){
            return {winner: 'o',rowToDefend: row,colToDefend: 3-i-j};
          }
        }
      }
    }
    //check coloumn
    for(let col = 0; col < 3; col++){
      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(i != j && winnerMap[i][col] == 'x' && winnerMap[j][col] == "x" && winnerMap[3-i-j][col] == ''){
            return {winner: 'o',rowToDefend: 3-i-j,colToDefend: col};
          }
        }
      }
    }
    //check diagnose
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if (i != j && winnerMap[i][i] == 'x' && winnerMap[j][j] == 'x' && winnerMap[3-i-j][3-i-j] == ''){
          return {winner: 'o', rowToDefend: 3-i-j, colToDefend: 3-i-j};
        }
        if (i != j && winnerMap[i][2-i] == 'x' && winnerMap[j][2-j] == 'x' && winnerMap[3-i-j][i+j-1] == ''){
          return {winner: 'o', rowToDefend: 3-i-j, colToDefend: i+j-1};
        }
      }
    }
  return {winner: '',rowToDefend: null ,colToDefend: null}
  }

  const getWinner = (winnerMap) => {
    //Check row
    for (let i=0; i<3; i++){
      const isRowXWinning = winnerMap[i].every((cell) => cell =="x");
      const isRowOWinning = winnerMap[i].every((cell) => cell =="o");

      if (isRowXWinning) {
        return('X');
      }
      if (isRowOWinning) {
        return('O');
      }
    }
    //Check column
    for(let col = 0; col < 3; col++){
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++){
        if (winnerMap[row][col] != 'x'){
          isColumnXWinner = false;
        }
        if (winnerMap[row][col] != 'o'){
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner){
        return('X');
      }
      if (isColumnOWinner){
        return('O');
      }
    }
    //Check diagonals
    let isDiagonal1XWin = true;
    let isDiagonal1OWin = true;
    let isDiagonal2XWin = true;
    let isDiagonal2OWin = true;
    for (let i = 0; i < 3; i++) {
      if (winnerMap[i][i] != 'x'){
        isDiagonal1XWin = false;
      }
      if (winnerMap[i][i] != 'o'){
        isDiagonal1OWin = false;
      }
      if (winnerMap[i][2-i] != 'x'){
        isDiagonal2XWin = false;
      }
      if (winnerMap[i][2-i] != 'o'){
        isDiagonal2OWin = false;
      }
    } 
    if (isDiagonal1OWin || isDiagonal2OWin) {
      return "o";
    }
    if (isDiagonal1XWin || isDiagonal2XWin) {
      return "x";
    }
  }

  const checkTieState = () => {
    if (!map.some(row => row.some(cell => cell == ''))){
      Alert.alert('Tie', `It's a tie`,[
        {
          text: 'Restart',
          onPress: resetGame,
        }
      ]);
    }
  }

  const gameWon = (player) => {
    Alert.alert('Nice job', `Player ${player} won`,[
      {
        text: 'Restart',
        onPress: resetGame,
      }
    ]);
  }

  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn('x');
  }

  const botTurn = () => {
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === ''){
          possiblePositions.push({row: rowIndex, col: columnIndex});
        }
      })
    })
    let chosenOption;
   
    if (gameMode === "BOT_MEDIUM") {
      const mapCopy = copyArray(map);

      const {winner,rowToAttack,colToAttack} = botAttack(mapCopy);
      if (winner === "o") {
        // Attack that position
        chosenOption ={"col": colToAttack, "row": rowToAttack};
      }

      if (!chosenOption) {
        // Defend
        const {winner,rowToDefend,colToDefend} = botDefend(mapCopy);
        if (winner === "o") {
          // Attack that position
          chosenOption ={"col": colToDefend, "row": rowToDefend};
        }
      };
    }
    // choose random
    if (!chosenOption) {
      chosenOption =
        possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
  }

  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Tic Toc Toe</Text>
      <ImageBackground source={bg} style={styles.bg} resizeMode='contain'>
        <Text
          style = {{
            fontSize: 26,
            position:'absolute',
            top: 50,
            fontWeight: 'bold'
          }}
        >Current turn: {currentTurn.toUpperCase()}</Text>
        <View style = {styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style = {styles.row}>
              {row.map((cell, columnIndex) => ( 
                <Pressable 
                  key = {`row-${rowIndex}-col-${columnIndex}`}
                  onPress={() => onPress(rowIndex, columnIndex)} 
                  style = {styles.cell}
                >
                  {cell == 'o' && <View style={styles.circle}/>}
                  {cell == 'x' &&
                    <View style={styles.cross}>
                      <View style={styles.crossLine}/>
                      <View style={[styles.crossLine, styles.crossLineReversed]}/>
                    </View>
                  }
                </Pressable>))}
            </View>
          ))}
        </View>
        <View style={styles.buttons}>
          <Text
            onPress={() => setGameMode("LOCAL")}
            style={[
              styles.button,
              { backgroundColor: gameMode === "LOCAL" ? "#4F5686" : "#191F24" },
            ]}
          >
            Local
          </Text>
          <Text
            onPress={() => setGameMode("BOT_EASY")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_EASY" ? "#4F5686" : "#191F24",
              },
            ]}
          >
            Easy Bot
          </Text>
          <Text
            onPress={() => setGameMode("BOT_MEDIUM")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_MEDIUM" ? "#4F5686" : "#191F24",
              },
            ]}
          >
            Medium Bot
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D34",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    paddingTop: 50,
    fontWeight: 'bold',
    color: '#5d6bf2'
  },
  bg: {
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 21,
    paddingLeft: 1,
  },
  map:{
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 101,
    flex: 1,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 10,
    borderColor: 'green'
  },
  cross: {
    width: 80,
    height: 80,
  },
  crossLine: {
    position: 'absolute',
    left: 45,
    width: 11.5,
    height: 108,
    borderRadius: 5,
    backgroundColor: 'red',
    transform: [{
      rotate: '45deg'
    }]
  },
  crossLineReversed:{
    transform: [{
      rotate: '-45deg'
    }]
  },
  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
  },
})

export default TicTocToe