import Icon from "@expo/vector-icons/FontAwesome";
import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { ThemeContext, themes } from "@/config/Theme";
import { ThemeIconName } from "@/types/types";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconName = theme === themes.light ? "☀️" : "🌙";
  // const iconName = theme === themes.light ? "sun-o" : "moon-o";

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        elevation: 5, // 안드로이드에서의 그림자 효과
        backgroundColor: theme.kungyaYelloLight,
      }}
      onPress={() => {
        toggleTheme();
      }}>
      <Text style={{ fontSize: 45 }}>{iconName}</Text>
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
  },
});
