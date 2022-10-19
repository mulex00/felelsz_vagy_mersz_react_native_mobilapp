import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TitleScreen from './src/screens/titlescreen';
import SetupGame from './src/screens/setupgame';
import PlayerName from './src/screens/playername'
import SetupRounds from './src/screens/setuprounds';
import Game from './src/screens/game';
import EndScreen from './src/screens/endscreen';


const Stack = createNativeStackNavigator();

const App = () => {
//navigáció & screenek  
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='TitleScreen'>
          <Stack.Screen name="TitleScreen" component={TitleScreen}/>
          <Stack.Screen name="SetupGame" component={SetupGame}/>
          <Stack.Screen name="PlayerName" component={PlayerName}/>
          <Stack.Screen name="SetupRounds" component={SetupRounds}/>
          <Stack.Screen name="Game" component={Game}/>
          <Stack.Screen name="EndScreen" component={EndScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;