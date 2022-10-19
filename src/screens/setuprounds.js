import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground} from 'react-native';
import { useRoute } from '@react-navigation/native';

const SetupRounds = ({navigation}) => {
    const route = useRoute();
    const [numOfRounds, setNumOfRounds] = useState(1)
    
    let nameOfPlayer = route.params.Pname;
    let numberOfPlayer = route.params.PlayerNum;
  
  //A körök számát 1-20 között állíthatjuk be  
  if (numOfRounds<1){
    setNumOfRounds(1);
  }
  if (numOfRounds>20){
    setNumOfRounds(20);
  }
  //Átadjuk a következő sceennek a játékosok nevét, játékosok számát és a körök számát
  const sendValue = ()=>{
    navigation.navigate("Game", {
        Pname: nameOfPlayer,
        PlayerNum: numberOfPlayer,
        RoundsNum: numOfRounds,
    });
}
const sendBackValue = ()=>{
  navigation.navigate("PlayerName", {
      Pname: nameOfPlayer,
      PlayerNum: numberOfPlayer,
      RoundsNum: numOfRounds,
  });
}    
  return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
        <View style={styles.textcontainer}>
        <Text style={styles.title}>Add meg a körök számát!</Text>
        <View style={styles.setupbtn}>
        <TouchableOpacity style={styles.minusbtn} onPress={() => {setNumOfRounds(parseInt(numOfRounds)-1)}}>
        <Text style={styles.minustxt}>-</Text>
        </TouchableOpacity>
        <Text style={styles.nRounds}>{numOfRounds}</Text>
        <TouchableOpacity style={styles.plusbtn} onPress={() => {setNumOfRounds(parseInt(numOfRounds)+1)}}>
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
  nRounds:{
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
export default SetupRounds;