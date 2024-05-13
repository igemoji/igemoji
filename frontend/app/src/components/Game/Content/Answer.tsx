import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import { ThemeContext } from "@/config/Theme";
import { AnswerProps } from "@/types/types";

export default function Answer({ answerName, answerImage }: AnswerProps) {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleLayout = (event: { nativeEvent: { layout: { height: any } } }) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };
  const fontSize = containerHeight * 0.08;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {answerImage && <Image style={styles.image} source={{ uri: answerImage }} />}
      <Text style={{ fontSize, color: theme.text, fontFamily: "PretendardMedium" }}>
        {answerName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginBottom: 100,
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: "75%",
    width: "100%",
  },
});
