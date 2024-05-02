import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

import { ThemeContext } from "@/config/Theme";

export default function Answer() {
  const { theme } = useContext(ThemeContext);
  const [containerHeight, setContainerHeight] = useState(0);
  // TODO: 백엔드에서 전달받은 데이터로 교체
  const uri =
    "https://search.pstatic.net/common?type=o&size=176x264&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20140721_186%2F1405911310756Tt2X1_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2";
  const answer = "명량";

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
      <Text style={{ fontSize, color: theme.text, fontFamily: "PretendardMedium" }}>{answer}</Text>
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
    height: "75%",
    width: "100%",
  },
});
