import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function Messages() {
  const { theme } = useContext(ThemeContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState([
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
    "대원 : 이거 타이타닉 아님?",
  ]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      style={styles.chatBox}
      contentContainerStyle={styles.contentContainer}>
      {messages.map((message, index) => (
        <Text
          key={index}
          style={{
            ...Font.messages,
            color: theme.text,
            opacity:
              index === messages.length - 1 || index === messages.length - 2
                ? 1
                : index === messages.length - 3 || index === messages.length - 4
                  ? 0.5
                  : 0.3,
          }}>
          {message}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    position: "absolute",
    bottom: 0,
    maxHeight: 100,
    width: "100%",
  },
  contentContainer: {
    justifyContent: "flex-end",
  },
});
