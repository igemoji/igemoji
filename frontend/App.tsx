// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import Game from "./src/screens/Game/Game";
import Main from "./src/screens/Main/Main";
import RoomList from "./src/screens/Main/RoomList";
import Rank from "./src/screens/Rank/Rank";

import { themes, ThemeContext } from "@/config/Theme";

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = React.useState(themes.light);
  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
  };

  const [fontsLoaded] = useFonts({
    Katuri: require("~/fonts/Katuri.ttf"),
    Dovemayo: require("~/fonts/Dovemayo.ttf"),
    PretendardBlack: require("~/fonts/Pretendard-Black.ttf"),
    PretendardBold: require("~/fonts/Pretendard-Bold.ttf"),
    PretendardExtraBold: require("~/fonts/Pretendard-ExtraBold.ttf"),
    PretendardExtraLight: require("~/fonts/Pretendard-ExtraLight.ttf"),
    PretendardLight: require("~/fonts/Pretendard-Light.ttf"),
    PretendardMedium: require("~/fonts/Pretendard-Medium.ttf"),
    PretendardRegular: require("~/fonts/Pretendard-Regular.ttf"),
    PretendardSemiBold: require("~/fonts/Pretendard-SemiBold.ttf"),
    PretendardThin: require("~/fonts/Pretendard-Thin.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SafeAreaView style={styles.screen} />
      {/* <StatusBar hidden /> */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RoomList">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="RoomList" component={RoomList} />
          <Stack.Screen name="Rank" component={Rank} />
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
