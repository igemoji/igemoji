import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { PlayerListProps } from "@/types/types";

export default function WaitingScore({ playerList }: PlayerListProps) {
  const { theme } = useContext(ThemeContext);
  const highestScore = playerList ? Math.max(...playerList.map((player) => player.score)) : 0;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={[styles.scoreContainer, { borderColor: theme.black }]}>
          <Text style={[{ color: theme.text }, styles.scoreTitle, Font.gameWaitingMessage]}>
            현재 점수
          </Text>
          <View style={styles.scoreContent}>
            {playerList?.map((player, index) => (
              <View key={index} style={styles.row}>
                {/* 현재 점수 1위에게 불타는 이모티콘 */}
                {player.score === highestScore ? (
                  <View style={styles.fire}>
                    <Text style={[{ color: theme.text, textAlign: "left" }, Font.score]}>🔥</Text>
                  </View>
                ) : null}
                <View style={{ flex: 1 }}>
                  <Text style={[{ color: theme.text }, Font.score]}>{player.nickname}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[{ color: theme.text, textAlign: "right" }, Font.score]}>
                    {player.score}문제
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.messageContainer}>
        <Text style={[{ color: theme.text }, Font.gameWaitingMessage]}>
          곧, 다음 문제가 시작됩니다
        </Text>
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
    marginVertical: "5%",
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
    width: "80%",
    height: "100%",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fire: {
    position: "absolute",
    left: -25,
  },
  messageContainer: {
    alignItems: "center",
  },
});
