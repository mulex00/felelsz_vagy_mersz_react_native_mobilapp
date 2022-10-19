import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground} from 'react-native';
import { useRoute } from '@react-navigation/native';

const SetupGame = ({navigation}) => {
    const [numOfPlayer, setNumOfPlayer] = useState(1)
  
  //Játékosok számát 1-50 között adhatjuk meg   
  if (numOfPlayer<1){
    setNumOfPlayer(1);
  }
  if (numOfPlayer>50){
    setNumOfPlayer(50);
  }
  //Játékosok számát átadjuk a következő screennek
  const sendValue = ()=>{
    navigation.navigate("PlayerName", {
        PlayerNum: numOfPlayer,
    });
}    
  return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
        <View style={styles.textcontainer}>
        <Text style={styles.title}>Add meg a játékosok számát!</Text>
        <View style={styles.setupbtn}>
        <TouchableOpacity style={styles.minusbtn} onPress={() => {setNumOfPlayer(parseInt(numOfPlayer)-1)}}>
        <Text style={styles.minustxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.nPlayer}>{numOfPlayer}</Text>
        <TouchableOpacity style={styles.plusbtn} onPress={() => {setNumOfPlayer(parseInt(numOfPlayer)+1)}}>
        <Text style={styles.plustxt}>+</Text>
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.backbtn} onPress={() => {navigation.goBack()}}>
        <Text style={styles.backtxt}>Vissza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextbtn} onPress={sendValue}>
        <Text style={styles.nexttxt}>Tovább</Text>
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
  setupbtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  minusbtn:{
    width: 50,
    height: 70,
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  minustxt:{
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  nPlayer:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
    paddingTop: 30,
  },
  plusbtn:{
    width: 50,
    height: 70,
    backgroundColor: 'orange',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  plustxt:{
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  backbtn:{
    backgroundColor: 'white',
    padding: 20,
    marginRight: 100,
    borderRadius: 30,
    marginVertical: 20,
  },
  backtxt:{
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
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
export default SetupGame;