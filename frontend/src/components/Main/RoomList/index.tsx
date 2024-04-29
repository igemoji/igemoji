import React, { useContext } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";

import Body from "./Body";
import Header from "./Header";
import Background from "../../Background";
import Footer from "../../Footer";

import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function RoomList({ navigation }: NavigationProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <Background>
      <View style={styles.container}>
        <Header />
        <View style={{ flex: 1, marginTop: 10 }}>
          <Body />
        </View>
        <View style={{ height: 120, justifyContent: "center" }}>
          <Footer />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SCREENHEIGHT * 0.1,
    width: SCREENWIDTH * 0.9,
    flex: 1,
  },
});
