import React, { useContext } from "react";
import { StyleSheet, View, Dimensions, Text, Image } from "react-native";

import Background from "./Background";
import Footer from "../Footer";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function Rank() {
  const { theme } = useContext(ThemeContext);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={[Font.rankTitle, styles.titleText]}>랭킹 TOP 10</Text>
        </View>
        <View style={styles.rankContent}>
          <View style={styles.myRanking}>
            <Image style={styles.image} source={require("~/timerEmoji.png")} />
            <View style={{ flex: 1 }}>
              <Text>내 등수</Text>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: "row",
                justifyContent: "space-around",
              }}>
              <View style={{ width: "30%" }}>
                <Text>레벨</Text>
                <Text>닉네임</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center", width: "70%" }}>
                <Text>랭크포인트</Text>
              </View>
            </View>
          </View>
          <View style={styles.allRanking}></View>
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
    marginTop: SCREENHEIGHT * 0.02,
    width: SCREENWIDTH * 0.9,
    flex: 1,
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 3 },
  },
  rankContent: {
    flex: 6,
    // borderWidth: 1,
  },
  myRanking: {
    flex: 1,
    paddingStart: "20%",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  allRanking: {
    flex: 10,
    borderWidth: 1,
  },
  image: {
    position: "absolute",
    left: "-200%",
    top: "-80%",
    resizeMode: "contain",
    height: "200%",
    width: "420%",
  },
});
