import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import AnimatedNumbers from "react-native-animated-numbers";

import Button from "@/components/Button";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function WaitingScore() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useContext(ThemeContext);

  // TODO: 백엔드에서 전달받은 데이터로 교체
  const players = [
    "진쪽이",
    "이재종안녕하세요",
    "서성원인프라",
    "박세헌사탈",
    "홍지은데이터",
    "김대원으",
  ];
  const scores = [10, 4, 3, 2, 1, 0];
  const beforeRankPoint = [1780, 1630, 850, 950, 660, 900];
  const afterRankPoint = [1810, 1650, 850, 940, 640, 870];
  const [rankPoint, setRankPoint] = useState(beforeRankPoint[0]);
  const highestScore = Math.max(...scores);

  const handleGameExit = () => {
    console.log("나가기");
    navigation.navigate("RoomList");
  };

  useEffect(() => {
    setTimeout(() => {
      setRankPoint(afterRankPoint[0]);
    }, 1000);
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={[styles.scoreContainer, { borderColor: theme.black }]}>
          <Text style={[{ color: theme.text }, styles.scoreTitle, Font.gameWaitingMessage]}>
            최종 점수
          </Text>
          <View style={styles.scoreContent}>
            {players.map((player, index) => (
              <View key={index} style={styles.row}>
                {scores[index] === highestScore ? (
                  <View style={styles.winner}>
                    <Text style={[{ color: theme.text }, Font.endScore]}>🏆</Text>
                  </View>
                ) : null}
                <View style={{ flex: 3 }}>
                  <Text style={[{ color: theme.text, textAlign: "left" }, Font.endScore]}>
                    {player}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[{ color: theme.text, textAlign: "center" }, Font.endScore]}>
                    {scores[index]}문제
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={[Font.endScore, { color: theme.text, textAlign: "right" }]}>
                    {beforeRankPoint[index]}{" "}
                    <Text
                      style={[
                        afterRankPoint[index] - beforeRankPoint[index] >= 0
                          ? { color: theme.scoreGreen }
                          : { color: theme.scoreRed },
                      ]}>
                      (
                      {afterRankPoint[index] - beforeRankPoint[index] >= 0
                        ? `+${afterRankPoint[index] - beforeRankPoint[index]}`
                        : `${afterRankPoint[index] - beforeRankPoint[index]}`}
                      )
                    </Text>
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.myRankPoint}>
        <Text style={[{ color: theme.text }, Font.myRank]}>Rank Point</Text>
        <AnimatedNumbers
          animateToNumber={rankPoint}
          animationDuration={3000}
          fontStyle={[{ color: theme.text }, Font.myRankPoint]}
        />
      </View>
      <View style={styles.button}>
        <Button name="exit" onPress={handleGameExit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "25%",
  },
  innerContainer: {
    paddingVertical: "2%",
    width: "90%",
    height: "60%",
  },
  scoreContainer: {
    flex: 1,
    position: "relative",
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreTitle: {
    position: "absolute",
    top: -40,
  },
  scoreContent: {
    width: "85%",
    height: "100%",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  winner: {
    position: "absolute",
    left: -20,
  },
  myRankPoint: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "2%",
    width: "70%",
  },
  button: {
    width: "40%",
  },
});
