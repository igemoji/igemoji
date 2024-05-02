import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

import { ThemeContext } from "@/config/Theme";

export default function Chat() {
  const { theme } = useContext(ThemeContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    // TODO: 메세지 전송하는 소켓 구현
    console.log("Send message:", message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, borderColor: theme.grey, color: theme.text }}
        placeholder="메시지를 입력하세요"
        placeholderTextColor={theme.text}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={{
          ...styles.sendButton,
          borderColor: theme.grey,
          // backgroundColor: theme.kungyaYello,
        }}>
        <Image
          source={require("~/sendButton.png")}
          style={styles.sendButtonImage}
          resizeMode="center"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    bottom: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    height: 35,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  sendButton: {
    borderWidth: 1,
    borderRadius: 8,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonImage: {
    width: 20,
    height: 20,
  },
});
