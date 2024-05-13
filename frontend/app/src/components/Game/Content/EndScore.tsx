import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import AnimatedNumbers from "react-native-animated-numbers";

import Button from "@/components/Button";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { PlayerListProps } from "@/types/types";
import { getItem } from "@/utils/asyncStorage";

export default function WaitingScore({ playerList }: PlayerListProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useContext(ThemeContext);
  const [rankPoint, setRankPoint] = useState<number | null>(null);
  const highestScore = playerList ? Math.max(...playerList.map((player) => player.score)) : 0;

  const handleGameExit = () => {
    navigation.reset({ routes: [{ name: "RoomList" }] });
  };

  const ratingChange = async () => {
    const memberId = await getItem("memberId");
    const rating = playerList?.find((player) => player.memberId === memberId)?.rating as number;
    const addRating = playerList?.find((player) => player.memberId === memberId)
      ?.addRating as number;
    setRankPoint(rating);
    setTimeout(() => {
      setRankPoint(rating + addRating);
    }, 1000);
  };

  useEffect(() => {
    ratingChange();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={[styles.scoreContainer, { borderColor: theme.black }]}>
          <Text style={[{ color: theme.text }, styles.scoreTitle, Font.gameWaitingMessage]}>
            최종 점수
          </Text>
          <View style={styles.scoreContent}>
            {playerList?.map((player, index) => (
              <View key={index} style={styles.row}>
                {player.score === highestScore ? (
                  <View style={styles.winner}>
                    <Text style={[{ color: theme.text }, Font.endScore]}>🏆</Text>
                  </View>
                ) : null}
                <View style={{ flex: 3 }}>
                  <Text style={[{ color: theme.text, textAlign: "left" }, Font.endScore]}>
                    {player.nickname}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[{ color: theme.text, textAlign: "center" }, Font.endScore]}>
                    {player.score}문제
                  </Text>
                </View>
                <View style={{ flex: 2 }}>
                  <Text style={[Font.endScore, { color: theme.text, textAlign: "right" }]}>
                    {player.rating + (player.addRating as number)}
                    {player.addRating !== null && (
                      <Text
                        style={[
                          player.addRating >= 0
                            ? { color: theme.scoreGreen }
                            : { color: theme.scoreRed },
                        ]}>
                        ({player.addRating >= 0 ? `+${player.addRating}` : `${player.addRating}`})
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      {rankPoint !== null && (
        <View style={styles.myRankPoint}>
          <Text style={[{ color: theme.text }, Font.myRank]}>Rank Point</Text>
          <AnimatedNumbers
            animateToNumber={rankPoint}
            animationDuration={3000}
            fontStyle={[{ color: theme.text }, Font.myRankPoint]}
          />
        </View>
      )}
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
    marginBottom: 100,
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
