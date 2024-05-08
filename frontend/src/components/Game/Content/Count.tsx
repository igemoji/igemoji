import React, { useContext } from "react";
import { View, Text } from "react-native";

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
    <View>
      {/* <Text style={{ ...Font.quizCount, color: theme.text }}>장르 : {genre}</Text> */}
      <Text style={{ ...Font.quizCount, color: theme.text }}>
        문제 수 : {quiz[0]}/{quiz[1]}
      </Text>
    </View>
  );
}
