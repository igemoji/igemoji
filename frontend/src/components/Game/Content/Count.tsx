import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

interface ICount {
  quiz: number[];
  time: number;
  genre: string;
}

export default function Count({ quiz, time, genre }: ICount) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ ...Font.quizCount, color: theme.text }}>장르 : {genre}</Text>
        <Text style={{ ...Font.quizCount, color: theme.text }}>
          문제 수 : {quiz[0]}/{quiz[1]}
        </Text>
      </View>
      <View>
        <Text style={{ ...Font.timeCount, color: theme.text }}>{time}초</Text>
      </View>
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
