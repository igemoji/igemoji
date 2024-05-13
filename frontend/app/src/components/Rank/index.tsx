import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import Background from "./Background";
import Footer from "../Footer";

import { getRankListAxios } from "@/API/Rank";
import Font from "@/config/Font";
import { ranking } from "@/types/types";
import { getItem } from "@/utils/asyncStorage";

export default function Rank() {
  const [ranking, setRanking] = useState<ranking[]>([]);
  const [myRanking, setMyRanking] = useState<ranking>();
  const [topRanking, setTopRanking] = useState<ranking[]>([]);

  useEffect(() => {
    const getRankList = async () => {
      try {
        const memberId = await getItem("memberId");
        const { data } = await getRankListAxios(Number(memberId));
        setRanking(data.data.ranks);
        setMyRanking(data.data.myRank);
        setTopRanking([data.data.ranks[1], data.data.ranks[0], data.data.ranks[2]]);
      } catch (error) {
        console.log(error);
      }
    };
    getRankList();
  }, []);

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
              <Text style={Font.rankingNumber}>{myRanking?.rank}</Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingEnd: 30,
              }}>
              <View style={{ width: "30%" }}>
                <Text style={[Font.rankingLevel, { marginBottom: -3 }]}>Lv.{myRanking?.level}</Text>
                <Text style={Font.rankingNickname}>{myRanking?.nickname}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <Text style={Font.rankingScore}>{myRanking?.rating}점</Text>
              </View>
            </View>
          </View>
          <View style={styles.allRanking}>
            <View style={styles.topThreeUser}>
              {topRanking.map((user, index) => (
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
                  <Text style={Font.rankingScore}>{user.rating}점</Text>
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
                      <Text style={Font.rankingScore}>{user.rating}점</Text>
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
    width: "90%",
    flex: 1,
    maxWidth: 500,
  },
  title: {
    marginTop: 10,
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
    height: 50,
    paddingStart: 50,
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
    left: "-210%",
    top: "-80%",
    resizeMode: "contain",
    height: "200%",
    width: "420%",
  },
  topThreeUser: {
    height: 150,
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
    maxHeight: "60%",
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
