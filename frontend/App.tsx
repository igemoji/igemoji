import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

import { MusicContext } from "@/config/Music";
import { themes, ThemeContext } from "@/config/Theme";
import KakaoLogin from "@/screens/Auth/KakaoLogin";
import SignIn from "@/screens/Auth/SignIn";
import SignUp from "@/screens/Auth/SignUp";
import Game from "@/screens/Game/Game";
import Main from "@/screens/Main/Main";
import RoomList from "@/screens/Main/RoomList";
import Rank from "@/screens/Rank/Rank";

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = useState(themes.light);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [buttonSound, setButtonSound] = useState<Audio.Sound | undefined>(undefined);
  const [isMusicOn, setIsMusicOn] = useState(true);

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

  useEffect(() => {
    loadSound();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MusicContext.Provider value={{ isMusicOn, toggleMusic, sound, setSound, playButtonSound }}>
        <NavigationContainer>
          <StatusBar hidden translucent={false} backgroundColor="transparent" />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="RoomList" component={RoomList} />
            <Stack.Screen name="Rank" component={Rank} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
          </Stack.Navigator>
        </NavigationContainer>
      </MusicContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
