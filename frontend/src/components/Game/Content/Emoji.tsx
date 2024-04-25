import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function Emoji() {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleLayout = (event: { nativeEvent: { layout: { height: any } } }) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const fontSize = containerHeight * 0.3;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Text style={[Font.emoji, { fontSize }, styles.text]}>🌊⚔️🛶😠🇰🇷</Text>
      <Text style={{ ...Font.hint, ...styles.text, color: theme.text }}>
        *명대사 : 싸움에 있어 죽고자 하면 반드시 살고 살고자 하면 죽는다
      </Text>
      <Text style={{ ...Font.hint, ...styles.text, color: theme.text }}>*초성 : ㅁㄹ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: "5%",
  },
  text: {
    textAlign: "center",
  },
});
