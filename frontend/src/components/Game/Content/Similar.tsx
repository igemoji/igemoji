import React, { useContext } from "react";
import { Text, StyleSheet, View } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function Similar() {
  const { theme } = useContext(ThemeContext);
  const similarInfo: any[] = [{ title: "준비중입니다", similar: 100 }];

  return (
    <View style={styles.container}>
      <View style={{ ...styles.word, top: "0%", left: "0%" }}>
        <View style={styles.progressBarBackground}>
          <View style={{ ...styles.progressBarFill, width: "60%" }} />
        </View>
        <Text style={[styles.wordText, Font.similar, { color: theme.text }]}>애나벨</Text>
      </View>
      <View style={{ ...styles.word, top: "80%", left: "40%" }}>
        <View style={styles.progressBarBackground}>
          <View style={{ ...styles.progressBarFill, width: "60%" }} />
        </View>
        <Text style={[styles.wordText, Font.similar, { color: theme.text }]}>
          닥터스트레인지 대혼돈의 멀티버스
        </Text>
      </View>

      {similarInfo.length !== 0 && (
        <View style={styles.similarRank}>
          <View style={styles.similarRankContent}>
            <View style={styles.similarRankWord}>
              <Text style={[styles.benchmarkText, Font.similarRankTitle, { color: theme.text }]}>
                제목
              </Text>
            </View>
            <View style={styles.similarRankNumber}>
              <Text style={[styles.benchmarkText, Font.similarRankTitle, { color: theme.text }]}>
                유사도
              </Text>
            </View>
          </View>

          {similarInfo.slice(0, 10).map((item, index) => (
            <View style={styles.similarRankContent} key={index}>
              <View style={styles.similarRankWord}>
                <Text
                  style={[styles.benchmarkText, Font.similar, { color: theme.text }]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.title}
                </Text>
              </View>
              <View style={styles.similarRankNumber}>
                <Text
                  style={[styles.benchmarkText, Font.similar, { color: theme.text }]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.similar}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    position: "relative",
    marginBottom: "20%",
    // alignItems: "center",
    // justifyContent: "center",
    // borderWidth: 1,
  },
  word: {
    position: "absolute",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBackground: {
    height: 5,
    width: 50,
    backgroundColor: "#e0e0e0",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#47A437",
  },
  wordText: {
    textAlign: "center",
  },
  similarRank: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 100,
    maxHeight: 150,
    gap: 3,
  },
  similarRankContent: {
    flexDirection: "row",
  },
  similarRankWord: {
    flex: 7,
  },
  similarRankNumber: {
    flex: 3,
  },
  benchmarkText: {
    textAlign: "center",
  },
});
