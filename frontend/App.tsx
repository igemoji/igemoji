import { NavigationContainer, useNavigation, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import Game from "./src/screens/Game/Game";
import Main from "./src/screens/Main/Main";
import RoomList from "./src/screens/Main/RoomList";
import Rank from "./src/screens/Rank/Rank";

import { MusicContext } from "@/config/Music";
import { themes, ThemeContext } from "@/config/Theme";

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = React.useState(themes.light);
  const [sound, setSound] = React.useState<Audio.Sound | undefined>(undefined);
  const [buttonSound, setButtonSound] = React.useState<Audio.Sound | undefined>(undefined);
  const [isMusicOn, setIsMusicOn] = React.useState(true);

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
  };

  const toggleMusic = async () => {
    if (sound) {
      if (isMusicOn) {
        await sound.stopAsync();
      } else {
        await sound.setIsLoopingAsync(true);
        await sound.setVolumeAsync(1);
        await sound.playAsync();
      }
      setIsMusicOn(!isMusicOn);
    }
    if (buttonSound) {
      setButtonSound(undefined);
    } else {
      const { sound } = await Audio.Sound.createAsync(require("~/music/pop_up.mp3"));
      setButtonSound(sound);
    }
  };

  async function loadSound() {
    if (sound === undefined) {
      const { sound } = await Audio.Sound.createAsync(require("~/music/sunrise.mp3"));
      setSound(sound);

      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(1);
      await sound.playAsync();
    }
    if (buttonSound === undefined) {
      const { sound } = await Audio.Sound.createAsync(require("~/music/pop_up.mp3"));
      setButtonSound(sound);
    }
  }

  async function playButtonSound() {
    if (buttonSound) {
      await buttonSound.setVolumeAsync(1);
      await buttonSound.playAsync();
    }
  }

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadSound();
  }, []);

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

  React.useEffect(() => {
    // console.log(fontsLoaded);
    // console.log(sound);

    if (fontsLoaded && sound) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, sound]);

  return (
    fontsLoaded && (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <MusicContext.Provider value={{ isMusicOn, toggleMusic, sound, setSound, playButtonSound }}>
          <SafeAreaView style={styles.screen} />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Game" component={Game} />
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="RoomList" component={RoomList} />
              <Stack.Screen name="Rank" component={Rank} />
            </Stack.Navigator>
          </NavigationContainer>
        </MusicContext.Provider>
      </ThemeContext.Provider>
    )
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
  },
});

export default App;
