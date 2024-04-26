import Icon from "@expo/vector-icons/FontAwesome";
import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { ThemeContext, themes } from "@/config/Theme";
import { ThemeIconName } from "@/types/types";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconName = theme === themes.light ? "sun-o" : "moon-o";

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        shadowColor: theme.black, // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
        shadowOpacity: 0.25, // 그림자 투명도
        shadowRadius: 3, // 그림자의 흐릿한 정도
        elevation: 5, // 안드로이드에서의 그림자 효과
        backgroundColor: theme.kungyaYelloLight,
      }}
      onPress={() => {
        toggleTheme();
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
  },
});
