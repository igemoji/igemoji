import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { PromptProps } from "@/types/types";

export default function Prompt({ answerMember }: PromptProps) {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event: { nativeEvent: { layout: { height: any; width: any } } }) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  };
  return (
    <View style={styles.outerContainer}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.black,
          opacity: 0.8,
          height: containerHeight,
          width: containerWidth,
        }}
      />
      <View style={{ ...styles.container }} onLayout={handleLayout}>
        <Text style={[{ color: theme.white }, Font.quizCount]}>
          {answerMember
            ? `${answerMember}님께서 정답을 맞히셨습니다.`
            : "아무도 정답을 맞히지 못했습니다."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  container: {
    position: "absolute",
    borderRadius: 100,
    paddingHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
});
