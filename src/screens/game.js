import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, Image, TextInput, TouchableOpacity, View, ImageBackground, BlurView} from 'react-native';
import tasks from '../tasks.json';
import questions from '../questions.json';
import { useRoute } from '@react-navigation/native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

let score = [];
let drank = [];
let canAnswer = [];
let usedQuestions = [];
let usedTasks = [];
let incScore;
let alltask = tasks; 
let allquestion = questions;

const Game = ({navigation}) => {
  //Az előző screentől megkapjuk a játékosok nevét, számát és a körök számát.
  const route = useRoute();
  let nameOfPlayer = route.params.Pname;
  let numberOfPlayer = route.params.PlayerNum;
  let numberOfRounds = route.params.RoundsNum;
 
  const [round, setRound] = useState(1); //Körök számlálása
  const [showTask, setShowTask] = useState(false); //Feladat megjelenítése
  const [showModeSelect, setModeSelect] = useState(true); //Felelés vagy Merés menü megjelenítése
  const [showCanAnswer, setShowCanAnswer] = useState(true); //Felelés gomb megjelenítése
  const [task, setTask] = useState(tasks[0].task); //Feladat megjelenítése JSON-ból
  const [playerCounter, setPlayerCounter] = useState(0); //Játékos számláló
  const [dare, setDare] = useState(false); //Igaz hamis konstans, hogy az adott játékos Merésre nyomott vagy sem.
  let randomnumber; 

  //Mivel random kapjuk a feladatokat, ezért az ismétlés elkerülése érdekében ezekben a tömbökben fogjuk majd eltárolni a már megkapott feladatokat.
  function createEmptyArrays(){
  if(round==1 && playerCounter==0){
  for(let i = 0; i<numberOfPlayer; i++){
    usedTasks[i] = [];
    usedQuestions[i] = [];
  }
}
}

//Játék vége
function EndGame(){  
  if(round==numberOfRounds && playerCounter==numberOfPlayer-1){
    sendValue();
  }
}
function EndGame2(){  
  if(round>numberOfRounds){
    sendValue();
  }
}  

if (!randomnumber){
  randomnumber=0;
}

//Ha a Merés opciót választjuk 100 pontot kapunk, ha a Felelést, akkor csak 50-et
if (dare == true){
  incScore = 100;
}else{
  incScore = 50;
}

//Körök számlálása, első kör, megengedett felelések száma.
if (playerCounter==numberOfPlayer){
  setPlayerCounter(0);
  setRound(parseInt(round+1));
}
if(round==1 && playerCounter<numberOfPlayer){
  score[playerCounter]=0;
  drank[playerCounter]=0;
  }
  if(round==1 && playerCounter<numberOfPlayer && showModeSelect==true){
    canAnswer[playerCounter]=3;
  }

  //Játékosok nevét, számát, pontjait és ivásai számát továbbküldjük a játék vége screenre. 
  function sendValue() {
    navigation.navigate("EndScreen", {
        Pname: nameOfPlayer,
        PlayerNum: numberOfPlayer,
        Score: score,
        Drank: drank,
    });
}
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
        {showTask ? (
        <View style={styles.textcontainer}>
        <Text style={styles.playername}>{round}. kör Játékos: {nameOfPlayer[playerCounter]}</Text>
        <Text style={styles.task}>{task}</Text>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.drinkbtn} onPress={() => {setModeSelect(true), setShowTask(false), drank[playerCounter]+= 1, setPlayerCounter(parseInt(playerCounter+1)), hideAnswerButton(), EndGame(), EndGame2(), ereaseArray()}}>
        <Image source={require('../img/drink.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completedbtn} onPress={() => {setModeSelect(true), setShowTask(false), score[playerCounter]+= incScore, setPlayerCounter(parseInt(playerCounter+1)), hideAnswerButton(), EndGame(), EndGame2(), ereaseArray()}}>
        <Image source={require('../img/completed.png')}/>
        </TouchableOpacity>
        </View>
        <Text style={styles.task}>Pontszám: {score[playerCounter]}</Text>
        <Text style={styles.task}>Ivott: {drank[playerCounter]}</Text>
        <Text style={styles.task}>Felelhet: {canAnswer[playerCounter]}</Text>
        </View>
        ) : null 
        }
        {showModeSelect ? (
        <View style={styles.textcontainer}>
        <Text style={styles.playername}>{round}. kör Játékos: {nameOfPlayer[playerCounter]}</Text>
        <Text style={styles.task}>Felelsz vagy mersz?</Text>
        <View style={styles.buttons}>
        {showCanAnswer ? (
        <TouchableOpacity style={styles.darebtn} onPress={() => {setDare(false), GenerateRandomNumberTruth(), decreaseAnswers(), setTask(allquestion[randomnumber].question), setModeSelect(false), setShowTask(true), EndGame2()}}>
        <Text style={styles.daretxt}>Felelek</Text>
        </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.answerbtn} onPress={() => {setDare(true), GenerateRandomNumberDare(), setTask(alltask[randomnumber].task), setModeSelect(false), setShowTask(true), EndGame2()}}>
        <Text style={styles.answertxt}>Merek</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.task}>Pontszám: {score[playerCounter]}</Text>
        <Text style={styles.task}>Ivott: {drank[playerCounter]}</Text>
        <Text style={styles.task}>Felelhet: {canAnswer[playerCounter]}</Text>
        </View>
        ) : null 
        } 
        </ImageBackground>
      </View>
    );

    //Random generátor segítségével random kiválaszt a program nekünk egy merést, úgy, hogy egy adott játékos mégegyszer ugyanazt ne kapja.
    function GenerateRandomNumberDare()
    {
      createEmptyArrays();
      console.log(playerCounter+'. jatekos: ');
      randomnumber = Math.floor(Math.random()* tasks.length-1)+1;
      console.log('Uj szam: ' + randomnumber);
      for(let i = 0; i < usedTasks[playerCounter].length; i++){
        if(usedTasks[playerCounter][i] == randomnumber){
          randomnumber = Math.floor(Math.random()* tasks.length-1)+1;
          console.log('Egyezes '+ i + 'Uj szam: ' + randomnumber);
          i = -1;
        }
      }   
      usedTasks[playerCounter].push(randomnumber);
      console.log(usedTasks);
    }
    //Random generátor segítségével random kiválaszt a program nekünk egy felelést, úgy, hogy egy adott játékos mégegyszer ugyanazt ne kapja.
    function GenerateRandomNumberTruth()
    {
      createEmptyArrays();
      console.log(playerCounter+'. jatekos: ');
      randomnumber = Math.floor(Math.random()* questions.length-1)+1;
      console.log('Uj szam: ' + randomnumber);
      for(let i = 0; i < usedQuestions[playerCounter].length; i++){
        if(usedQuestions[playerCounter][i] == randomnumber){
          randomnumber = Math.floor(Math.random()* questions.length-1)+1;
          console.log('Egyezes '+ i + 'Uj szam: ' + randomnumber);
          i = -1;
        }
      }   
      usedQuestions[playerCounter].push(randomnumber);
      console.log(usedQuestions);
    }

    //Kiürítjük a játékvégén a tömböket, amikben ideiglenes értékeket tároltunk.
    function ereaseArray(){
      if(round>=numberOfRounds && playerCounter == numberOfPlayer-1){
        usedTasks = [];
        usedQuestions = [];
        setShowTask(false);
        setModeSelect(false);
        console.log('urites');
        for(let i = 0; i<numberOfPlayer; i++){
          canAnswer[i] = 3;
        }
      }
    };

    //Felelések számának csökkenése
    function decreaseAnswers(){
        canAnswer[playerCounter]-=1;
    }
    //Felelés gomb elrejtése
    function hideAnswerButton(){
      if(playerCounter < numberOfPlayer-1){
      if (canAnswer[playerCounter+1]<=0){
        canAnswer[playerCounter+1]=0;
        setShowCanAnswer(false);
      }
      if (canAnswer[playerCounter+1]>0){
        setShowCanAnswer(true);
      }
    }
    if(playerCounter == numberOfPlayer-1 ){
      if (canAnswer[0]<=0){
        canAnswer[0]=0;
        setShowCanAnswer(false);
      }
      if (canAnswer[0]>0){
        setShowCanAnswer(true);
      }
    }
  }
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
  playername:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
  },
  task:{
    color: 'black',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing:1.1,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  completedbtn:{
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  darebtn:{
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
  },
  daretxt:{
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  drinkbtn:{
    backgroundColor: 'gold',
    padding: 20,
    borderRadius: 30, 
    marginVertical: 20,
  },
  answerbtn:{
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 30, 
    marginVertical: 20,
  },
  answertxt:{
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },


});  
export default Game;