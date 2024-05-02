import React, { useContext } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

import { ThemeContext } from "@/config/Theme";
import { useCountdown } from "@/hook/useCountdown";
import type { Props } from "@/types/types";
import { getWrapperStyle, timeStyle } from "@/utils/utils";
import Font from "@/config/Font";

const Timer = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const { children, duration } = props;
  const { stroke, remainingTime, elapsedTime } = useCountdown(props);

  return (
    <View style={styles.container}>
      <View style={getWrapperStyle("100%") as StyleProp<ViewStyle>}>
        <View style={{ ...styles.bar, backgroundColor: theme.grey }}>
          <View
            style={{
              ...styles.animatedBar,
              backgroundColor: stroke,
              width: `${102 - 100 * (elapsedTime / duration)}%`,
            }}>
            <Image style={styles.image} source={require("~/timerEmoji.png")} />
          </View>
        </View>
        {typeof children === "function" && (
          <View style={timeStyle as StyleProp<ViewStyle>}>
            <Text style={[{ color: theme.text }, Font.timeCount]}>
              {children({ remainingTime, elapsedTime, color: stroke })}초
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default Timer;

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
    right: "-148%",
    top: "-150%",
    resizeMode: "contain",
    height: "300%",
    width: "300%",
  },
});
