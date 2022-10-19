import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, BackHandler, Text, TextInput, TouchableOpacity, View, ImageBackground, Alert, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';

const TitleScreen = ({navigation}) => { 
  return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
        <Image style={styles.logo} source={require('../img/gamelogo.png')}/>
        <View style={styles.buttons}>
          <Button title='Játék' color={'black'} onPress={() => {navigation.navigate("SetupGame")}}></Button>
        </View>
        <View style={styles.buttons}>  
          <Button title='Kilépés' color={'black'} onPress={() => AlertMessage()}></Button>
        </View>
        </ImageBackground>
      </View>
    );
    
    //Kilépés a programból
    function AlertMessage(){
      Alert.alert(
        "Kilépés",
        "Biztosan ki akarsz lépni a játékból?",
        [
          {
            text: "Mégse", style: 'cancel'
          },
          {
            text: "Igen", onPress: () => BackHandler.exitApp()
          }
        ]
      )
    };
};

const styles = StyleSheet.create({
  container:{
  },
  logo:{  
    width: '90%',
    resizeMode: 'contain'
    },
  backgroundImage:{
    alignItems: 'center',
    height : '100%',
    width : '100%',
  },
  buttons:{
    width: '80%',
    paddingBottom: 40,
  },
  playbtn:{
    borderWidth: 1,
    backgroundColor: 'purple',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  playtxt:{
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },

});  
export default TitleScreen;