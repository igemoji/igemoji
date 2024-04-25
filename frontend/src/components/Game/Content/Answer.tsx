import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import { ThemeContext } from "@/config/Theme";

export default function Answer() {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const uri =
    "https://i.namu.wiki/i/l2UhHZ_N6Vx4903uuQl92fntuc3jlIG__3cwdduPueuqzON1fcX1lLZB99znfOmIW4p_K1sx6VPGNZf1GgxiThI4ndjc95ohHg6Pq5Vks8UU36R529LAJ8ABnyN3YbMH5lV5m4vMMxzGTHG31o88Ng.webp";

  const handleLayout = (event: { nativeEvent: { layout: { height: any } } }) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };
  const fontSize = containerHeight * 0.08;

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Image
        style={styles.image}
        source={{
          uri,
        }}
      />
      <Text style={{ fontSize, color: theme.text }}>명량</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginBottom: "15%",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: "90%",
    width: "100%",
  },
});
