import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, Animated } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { Message } from "@/types/types";

export default function Similar({ messages }: { messages: Message[] }) {
  const { theme } = useContext(ThemeContext);
  const [similarEffect, setSimilarEffect] = useState<Message[]>([]);
  const [similarRank, setSimilarRank] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length && messages[messages.length - 1].similarScore) {
      const isExisting = similarRank.some(
        (item) => item.similarScore === messages[messages.length - 1].similarScore
      );
      if (!isExisting) {
        setSimilarEffect((currentSimilar) => [...currentSimilar, messages[messages.length - 1]]);
        setSimilarRank((currentSimilar) => [...currentSimilar, messages[messages.length - 1]]);
        setTimeout(() => {
          setSimilarEffect((currentSimilar) => currentSimilar.slice(1));
        }, 5000);
      }
    }
  }, [messages]);

  const sortedSimilarRank = [...similarRank].sort((a, b) => {
    const similarA = a.similarScore ?? 0;
    const similarB = b.similarScore ?? 0;
    return similarB - similarA;
  });

  return (
    <View style={styles.container}>
      <View style={{ ...styles.word }}>
        {similarEffect.map((data, index) => (
          <ProgressBar
            title={data.content}
            similar={data.similarScore || 100}
            key={data.nickname + index}
          />
        ))}
      </View>
      {sortedSimilarRank.length !== 0 && (
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
          {sortedSimilarRank.map((data, index) => (
            <View style={styles.similarRankContent} key={index}>
              <View style={styles.similarRankWord}>
                <Text
                  style={[styles.benchmarkText, Font.similar, { color: theme.text }]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data.content}
                </Text>
              </View>
              <View style={styles.similarRankNumber}>
                <Text
                  style={[styles.benchmarkText, Font.similar, { color: theme.text }]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {Math.round(data.similarScore as number)}
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
    marginBottom: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  word: {
    flex: 1,
    height: "100%",
    marginRight: 10,
    gap: 10,
    paddingVertical: "5%",
    alignItems: "center",
    overflow: "hidden",
  },
  progressBarBackground: {
    height: 10,
    width: 100,
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
    width: 100,
    gap: 3,
    overflow: "hidden",
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

const ProgressBar = ({ title, similar }: { title: string; similar: number }) => {
  const { theme } = useContext(ThemeContext);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = (similar / 100) * 100;

    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
      }}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { width }, { backgroundColor: theme.kungyaGreenAccent2 }]}
        />
      </View>
      <Text style={{ ...Font.mainSmall, color: theme.text, textAlign: "center" }}>{title}</Text>
    </View>
  );
};
