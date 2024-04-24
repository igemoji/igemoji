import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

interface ICount {
  quiz: number[];
  time: number;
}

export default function Count({ quiz, time }: ICount) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{ ...Font.quizCount, color: theme.text }}>
        문제 수 : {quiz[0]}/{quiz[1]}
      </Text>
      <Text style={{ ...Font.timeCount, color: theme.text }}>{time}초</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bar: {
    height: 10,
    borderRadius: 10,
  },
  animatedBar: {
    height: "100%",
    borderRadius: 10,
    position: "relative",
  },
  image: {
    position: "absolute",
    right: "-150%",
    top: "-150%",
    resizeMode: "contain",
    height: "300%",
    width: "300%",
  },
});
