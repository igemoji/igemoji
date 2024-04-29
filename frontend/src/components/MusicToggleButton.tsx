import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { MusicIconName } from "@/types/types";

export default function MusicToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isMusicOn, toggleMusic } = useContext(MusicContext);

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: theme.kungyaYelloLight,
      }}
      onPress={() => {
        toggleMusic();
      }}>
      <Text style={{ fontSize: 45 }}>🎵</Text>
      {!isMusicOn && <Text style={{ fontSize: 45, position: "absolute" }}>❌</Text>}
      {/* <Icon name={iconName} size={60} color="black" /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    opacity: 0.8,
    width: 80,
    height: 80,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // 안드로이드에서의 그림자 효과
  },
});
