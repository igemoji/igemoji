import React, { useContext } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { ThemeContext } from "@/config/Theme";

export default function Game() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <ImageBackground source={require("~/background/gameBackground.png")} style={styles.container}>
        <View style={{ ...styles.container, backgroundColor: theme.gameBackGround }}>
          <View style={styles.header}>
            <Text>헤더</Text>
          </View>
          <View style={styles.game}>
            <Text>게임</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  game: {
    flex: 15,
  },
  header: {
    flex: 1,
  },
});
