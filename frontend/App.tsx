// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Constants from "expo-constants";

import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import Game from "./src/screens/Game/Game";
import Main from "./src/screens/Main/Main";
import RoomList from "./src/screens/Main/RoomList";
import Rank from "./src/screens/Rank/Rank";
import { SafeAreaView, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <SafeAreaView style={styles.screen} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RoomList" component={RoomList} />
          <Stack.Screen name="Rank" component={Rank} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default App;
