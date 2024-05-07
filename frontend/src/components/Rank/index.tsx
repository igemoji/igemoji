import React, { useContext } from "react";
import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from "react-native";

import Background from "./Background";
import Footer from "../Footer";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function Rank() {
  const { theme } = useContext(ThemeContext);
  const ranking = [
    { rank: 4, level: 12, nickname: "나는2등", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "나는1등", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "3등", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
    { rank: 4, level: 12, nickname: "리벨벨", rankingPoint: 5013 },
  ];

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={[Font.rankTitle, styles.titleText]}>랭킹 TOP 30</Text>
        </View>
        <View style={styles.rankContent}>
          <View style={styles.myRanking}>
            <Image style={styles.image} source={require("~/timerEmoji.png")} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={Font.rankingNumber}>17</Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingEnd: 30,
              }}>
              <View style={{ width: "30%" }}>
                <Text style={[Font.rankingLevel, { marginBottom: -3 }]}>Lv.12</Text>
                <Text style={Font.rankingNickname}>리벨벨</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <Text style={Font.rankingScore}>4072점</Text>
              </View>
            </View>
          </View>
          <View style={styles.allRanking}>
            <View style={styles.topThreeUser}>
              {ranking.slice(0, 3).map((user, index) => (
                <View
                  style={{
                    ...styles.topThreeRanking,
                    height: index === 0 ? "95%" : index === 1 ? "100%" : "90%",
                  }}
                  key={index}>
                  <Image
                    style={{
                      ...styles.medalImage,
                      top: index === 0 ? "-7%" : index === 1 ? "-10%" : "-5%",
                    }}
                    source={
                      index === 0
                        ? require("~/2ndMedal.png")
                        : index === 1
                          ? require("~/1stMedal.png")
                          : require("~/3rdMedal.png")
                    }
                  />
                  <Text style={Font.rankingLevel}>Lv.{user.level}</Text>
                  <Text style={Font.rankingNickname}>{user.nickname}</Text>
                  <Text style={Font.rankingScore}>{user.rankingPoint}점</Text>
                </View>
              ))}
            </View>
            <ScrollView style={styles.etcUser}>
              {ranking.slice(3).map((user, index) => (
                <View style={styles.etcRanking} key={index}>
                  <View style={{ marginRight: 30 }}>
                    <Text style={Font.rankingNumber}>{user.rank}</Text>
                  </View>
                  <View
                    style={{
                      flex: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingEnd: 30,
                    }}>
                    <View>
                      <Text style={[Font.rankingLevel, { marginBottom: -3 }]}>Lv.{user.level}</Text>
                      <Text style={Font.rankingNickname}>{user.nickname}</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                      <Text style={Font.rankingScore}>{user.rankingPoint}점</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
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
    width: SCREENWIDTH * 0.9,
    flex: 1,
  },
  title: {
    height: SCREENHEIGHT * 0.1,
    alignItems: "center",
  },
  titleText: {
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 3 },
  },
  rankContent: {
    flex: 1,
  },
  myRanking: {
    height: SCREENHEIGHT * 0.06,
    paddingStart: "20%",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  allRanking: {
    flex: 1,
  },
  image: {
    position: "absolute",
    left: "-200%",
    top: "-80%",
    resizeMode: "contain",
    height: "200%",
    width: "420%",
  },
  topThreeUser: {
    height: SCREENHEIGHT * 0.2,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
    gap: 5,
  },
  topThreeRanking: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    paddingBottom: 10,
  },
  medalImage: {
    position: "absolute",
    resizeMode: "contain",
    height: "60%",
    width: "60%",
  },
  etcUser: {
    maxHeight: SCREENHEIGHT * 0.4,
  },
  etcRanking: {
    height: 50,
    paddingStart: 20,
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 5,
  },
});
