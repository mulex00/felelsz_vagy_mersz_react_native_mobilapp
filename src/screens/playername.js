import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlayerName = ({ navigation}) => {
    const route = useRoute();
    let numberOfPlayer = route.params.PlayerNum;
    let PlayerName = [];

    //A játékosok számát és neveit átadjuk a következő screennek
    const sendValue = ()=>{
        navigation.navigate("SetupRounds", {
            Pname: PlayerName,
            PlayerNum: numberOfPlayer,
        });
    } 

    var loop = [];

    //Az előző screenen beállított érték alapján beállíthatjuk mindegyik játékos nevét
    for (let i = 0; i < numberOfPlayer; i++) {
        loop.push(
            <View key={i}>
            <Text style={styles.playertxt}>{i+1}. játékos neve {PlayerName[i]}</Text>   
            <TextInput style={styles.playerName} onChangeText={(name)=>PlayerName[i]=name}></TextInput>
            </View>
        );
    }
    return (
        <View style={styles.bcground}>
            <ImageBackground style={styles.backgroundImage} source={require('../img/nightsky.jpg')} resizeMode="cover">
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.textcontainer}>
                        <Text style={styles.title}>Add meg a játékosok nevét!</Text>
                        <View>
                        {loop}
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.backbtn} onPress={() => { navigation.goBack() }}>
                            <Text style={styles.backtxt}>Vissza</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nextbtn} onPress={sendValue}>
                            <Text style={styles.nexttxt}>Tovább</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    bcground: {
    },
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage:{
        height : '100%',
        width : '100%',
      },
    textcontainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
        marginBottom: 20,
    },
    playertxt: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    playerName: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
        color: 'black',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    backbtn: {
        backgroundColor: 'white',
        padding: 20,
        marginRight: 100,
        borderRadius: 30,
        marginVertical: 20,
    },
    backtxt: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    nextbtn: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        marginVertical: 20,
    },
    nexttxt: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },

});
export default PlayerName;