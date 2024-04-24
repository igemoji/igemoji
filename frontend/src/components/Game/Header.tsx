import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ThemeContext } from "@/config/Theme";
import Font from "@/config/Font";

export default function Header() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{ ...Font.header, color: theme.text }}>18번 : 방 제목입니다</Text>
      <Text style={{ ...Font.header, color: theme.text }}>인원 : 6/6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
