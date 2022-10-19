import React, { useState, useEffect } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, BackHandler} from 'react-native';
import { useRoute } from '@react-navigation/native';

const EndScreen = ({navigation}) => {
    let maxscore = 0;
    let maxdrank = 0;
    let winners = [];
    let drunk = [];  

  //Értékeket megkapjuk az előző screenről  
  const route = useRoute();
  let nameOfPlayer = route.params.Pname;
  let numberOfPlayer = route.params.PlayerNum;
  let score = route.params.Score;
  let drank = route.params.Drank;    

  //Legmagasabb pontszám és ivásszám megkeresése.
  for(let i = 0; i<numberOfPlayer; i++){
    if(score[i]> maxscore){
        maxscore=score[i];
    }
    if(drank[i]> maxdrank){
        maxdrank=drank[i]
    }
  }

  //Győztes/győztesek neve. (Döntetlen esetén több győztes is lehet)
    for(let i = 0; i<numberOfPlayer; i++){
        if(score[i] == maxscore){
            winners.push(nameOfPlayer[i])
        }
        if(drank[i] == maxdrank){
            drunk.push(nameOfPlayer[i])
        }
    }

    var winnerLoop = [];
    for(let i = 0; i<winners.length; i++){
      winnerLoop.push(
          <View key={i}>
          <Text style={styles.winner}>{winners[i]}</Text>   
          </View>
      );
    }

    var drunkLoop = [];
    for(let i = 0; i<drunk.length; i++){
      drunkLoop.push(
          <View key={i}>
          <Text style={styles.drunk}>{drunk[i]}</Text>   
          </View>
      );
    };

    //Telefonon lévő vissza gomb ne az előző "játék" képernyőre vigyen minket vissza, hanem egyből a főmenübe!
    useEffect(
      React.useCallback(() => {
        const onBackPress = () => {
          navigation.navigate('TitleScreen');
          return true;
        };
        BackHandler.addEventListener(
          'hardwareBackPress',
          onBackPress
        );
        return () => {
          BackHandler.removeEventListener(
            'hardwareBackPress',
            onBackPress
          );
        };
      }, []),
    );
  


  return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
        <View style={styles.textcontainer}>
        <Text style={styles.title}>Győztesek</Text>
        <View>
            <Text style={styles.title2}>Legtöbb pontszámot elért:</Text>
            <View>
            {winnerLoop}
            </View>
            <Text style={styles.playertxt}>Elért pontszám: <Text style={styles.titleWinner}>{maxscore} pont</Text> </Text>
            <Text style={styles.title2}>Legtöbbet ivott:</Text>
            <View>
            {drunkLoop}
            </View>
            <Text style={styles.playertxt}>Ivások száma: <Text style={styles.titleDrunk}>{maxdrank} db </Text></Text>
        </View>
        </View>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.nextbtn} onPress={() => {navigation.navigate("TitleScreen")}}>
        <Text style={styles.nexttxt}>Vissza a kezdőképernyőre</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
  container:{
  },
  backgroundImage:{
    justifyContent: 'center',
    alignItems: 'center',
    height : '100%',
    width : '100%',
  },
  textcontainer:{
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
  },
  title:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
  },
  title2:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  titleWinner:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
  },
  titleDrunk:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
  },
  winner:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'green',
  },
  drunk:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'red',
  },
  playertxt: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
},
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nextbtn:{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  nexttxt:{
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },

});  
export default EndScreen;