import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

import Body from "./Body";
import Header from "./Header";
import Background from "../../Background";
import Footer from "../../Footer";

import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function RoomList({ navigation }: NavigationProps) {
  const { sound, setSound, isMusicOn } = useContext(MusicContext);
  const { theme } = useContext(ThemeContext);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadSound() {
      const { sound: newSound } = await Audio.Sound.createAsync(require("~/music/sunrise.mp3"));
      setSound(newSound);
      if (sound && isMusicOn) {
        await sound.stopAsync();
        await newSound.setIsLoopingAsync(true);
        await newSound.setVolumeAsync(1);
        await newSound.playAsync();
      }
    }
    loadSound();
  }, []);

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <Background>
      <View style={styles.container}>
        <Header refresh={refresh} />
        <View style={{ flex: 1, marginTop: 10 }}>
          <Body key={refreshKey} />
        </View>
        <View style={{ height: 120, justifyContent: "center" }}>
          <Footer />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SCREENHEIGHT * 0.1,
    width: SCREENWIDTH * 0.9,
    flex: 1,
  },
});
