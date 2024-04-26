import Icon from "@expo/vector-icons/MaterialIcons";
import React, { useState, useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { MusicIconName } from "@/types/types";
import { ThemeContext } from "@/config/Theme";

export default function MusicToggleButton() {
  const [iconName, setIconName] = useState<MusicIconName>("music-note");
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleMusicIcon = () => {
    setIconName(iconName === "music-note" ? "music-off" : "music-note");
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        shadowColor: theme.black, // 그림자 색상
        backgroundColor: theme.kungyaYelloLight,
      }}
      onPress={() => {
        toggleMusicIcon();
      }}>
      <Icon name={iconName} size={60} color="black" />
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
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 3, // 그림자의 흐릿한 정도
    elevation: 5, // 안드로이드에서의 그림자 효과
  },
});
