import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import { ThemeContext } from "@/config/Theme";

export default function Similar() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>유사도 단어가 나올 공간</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginBottom: "15%",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
  },
});
