// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import * as React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import Game from "./src/screens/Game/Game";
import Main from "./src/screens/Main/Main";
import RoomList from "./src/screens/Main/RoomList";
import Rank from "./src/screens/Rank/Rank";
import Test from "./src/screens/Test";

import { themes, ThemeContext } from "@/config/Theme";

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = React.useState(themes.light);
  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SafeAreaView style={styles.screen} />
      {/* <StatusBar hidden /> */}
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
=======
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Game">
>>>>>>> c0601b32f54267f9fb89e65232d4c24d93f64750
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RoomList" component={RoomList} />
          <Stack.Screen name="Rank" component={Rank} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default App;
