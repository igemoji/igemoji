import React, { useContext, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { EmojiProps } from "@/types/types";

export default function Emoji({ emoji, hint1, hint2 }: EmojiProps) {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleLayout = (event: { nativeEvent: { layout: { height: any } } }) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const fontSize = containerHeight * 0.3;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Text style={[Font.emoji, { fontSize }, styles.text]}>{emoji}</Text>
      <Text style={[Font.hint, styles.text, { color: theme.text }]}>{hint1}</Text>
      <Text style={[Font.hint, styles.text, { color: theme.text }]}>{hint2}</Text>
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
