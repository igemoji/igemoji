import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { EmojiProps } from "@/types/types";

export default function Emoji({ emoji, hint1, hint2, keyboardStatus }: EmojiProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: keyboardStatus ? 30 : 45 }]}>{emoji}</Text>
      {hint1 && (
        <Text
          style={[
            Font.hint,
            styles.text,
            { color: theme.text, fontSize: keyboardStatus ? 16 : 20 },
          ]}>
          {hint1}
        </Text>
      )}
      {hint2 && (
        <Text
          style={[
            Font.hint,
            styles.text,
            { color: theme.text, fontSize: keyboardStatus ? 20 : 24 },
          ]}>
          {hint2}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
  },
});
