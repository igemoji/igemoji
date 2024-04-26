import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import { ThemeContext } from "@/config/Theme";
import Font from "@/config/Font";

export default function Prompt() {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // TODO: 백엔드에서 전달받은 데이터로 교체
  const nickname = "이재종";

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
          {nickname} 님께서 정답을 맞추셨습니다.
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
