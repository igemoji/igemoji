import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { MusicIconName } from "@/types/types";
import { ThemeContext } from "@/config/Theme";

export default function MusicToggleButton() {
  // const [iconName, setIconName] = useState<MusicIconName>("music-note");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMusicOn, setIsMusicOn] = useState(true);

  const toggleMusicIcon = () => {
    setIsMusicOn(!isMusicOn);
    // setIconName(iconName === "music-note" ? "music-off" : "music-note");
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: theme.kungyaYelloLight,
      }}
      onPress={() => {
        toggleMusicIcon();
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
