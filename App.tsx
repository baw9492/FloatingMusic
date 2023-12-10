// In App.js in a new project
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
// import PlayingScreen from './src/screens/PlayingScreen';
import SongsListScreen from './src/screens/SongsListScreen';
import PlayingBar from './src/components/PlayingBar';

import {DState} from './src/state/dstate';
import SearchScreen from './src/screens/SearchScreen';
// import LocalScreen from './src/screens/LocalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DState>
      <PaperProvider>
        <>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              {/* <Stack.Screen name="Playing" component={PlayingScreen} /> */}
              <Stack.Screen name="SongList" component={SongsListScreen} />
              <Stack.Screen name="search" component={SearchScreen} />
              {/* <Stack.Screen name="local" component={LocalScreen} /> */}
            </Stack.Navigator>
            <PlayingBar />
          </NavigationContainer>
        </>
      </PaperProvider>
    </DState>
  );
}
