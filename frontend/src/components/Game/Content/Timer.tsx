import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useEffect, useContext } from "react";
import { StyleSheet, View, Animated, Image } from "react-native";

import { ThemeContext } from "@/config/Theme";

interface IStep {
  totalStep: number;
  nowStep: number;
}

export default function Timer({ totalStep, nowStep }: IStep) {
  const { theme } = useContext(ThemeContext);
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = (count: number) => {
    Animated.timing(loaderValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    load(nowStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowStep]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.bar, backgroundColor: theme.grey }}>
        <Animated.View
          style={{
            ...styles.animatedBar,
            backgroundColor: theme.kungyaGreenAccent2,
            width,
          }}>
          <LinearGradient
            colors={["red", "yellow"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.animatedBar}>
            <Image style={styles.image} source={require("~/timerEmoji.png")} />
          </LinearGradient>
        </Animated.View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  bar: {
    height: 10,
    borderRadius: 10,
  },
  animatedBar: {
    height: "100%",
    borderRadius: 10,
    position: "relative",
  },
  image: {
    position: "absolute",
    right: "-150%",
    top: "-150%",
    resizeMode: "contain",
    height: "300%",
    width: "300%",
  },
});
