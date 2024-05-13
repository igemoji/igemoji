import React, { useContext, ReactNode } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { ThemeContext } from "@/config/Theme";

interface BackgroundProps {
  children: ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ImageBackground
        source={require("~/background/gameBackground.png")}
        style={styles.backgroundImage}>
        <View style={{ ...styles.container, backgroundColor: theme.gameBackground }}>
          <View style={styles.content}>{children}</View>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
  },
});
