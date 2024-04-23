import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import HostWaiting from "./HostWaiting";
import Messages from "./Messages";

import { ThemeContext } from "@/config/Theme";

export default function Content() {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <HostWaiting />
      <Messages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
