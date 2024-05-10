import React, { useContext, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { Message } from "@/types/types";

export default function Messages({ messages }: { messages: Message[] }) {
  const { theme } = useContext(ThemeContext);
  const scrollViewRef = useRef<ScrollView>(null);

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
            color: message.message === "SYSTEM_CHAT" ? `tomato` : theme.text,
            opacity:
              index === messages.length - 1 || index === messages.length - 2
                ? 1
                : index === messages.length - 3 || index === messages.length - 4
                  ? 0.5
                  : 0.3,
          }}>
          {message.message === "WATCH_CHAT" ? "[관전]" : null} {message.nickname} :{" "}
          {message.content}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    position: "absolute",
    bottom: 0,
    maxHeight: 80,
    width: "100%",
  },
  contentContainer: {
    justifyContent: "flex-end",
  },
});
