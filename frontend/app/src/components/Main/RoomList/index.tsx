// import { Audio } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import Body from "./Body";
import Header from "./Header";
import Background from "../../Background";
import Footer from "../../Footer";

// import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";

export default function RoomList({ navigation }: NavigationProps) {
  // const { sound, setSound, isMusicOn } = useContext(MusicContext);
  const { theme } = useContext(ThemeContext);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        refresh();
      }, 500);
    }, [])
  );

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
    marginTop: 50,
    maxWidth: 500,
    width: "90%",
    flex: 1,
  },
});
