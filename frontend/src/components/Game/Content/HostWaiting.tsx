import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import ModalBox from "@/components/ModalBox";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function HostWaiting() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useContext(ThemeContext);
  const quizType = ["영화"];
  const quizCount = [10, 20, 30];
  const [selectedQuizType, setSelectedQuizType] = useState("영화");
  const [selectedQuizCount, setSelectedQuizCount] = useState(10);

  const handleQuizCountPress = (count: number) => {
    setSelectedQuizCount(count);
  };

  const handleQuizTypePress = (type: string) => {
    setSelectedQuizType(type);
  };

  const handleGameStart = () => {
    console.log("게임 시작");
  };

  const handleGameExit = () => {
    console.log("나가기");
    navigation.navigate("RoomList");
  };

  return (
    <View style={styles.container}>
      <View style={styles.hostWaiting}>
        <ModalBox title="hostWaiting" onPress={handleGameStart} onPress2={handleGameExit}>
          <View style={styles.modalBox}>
            <View style={styles.lineContainer}>
              <Text style={{ ...Font.modalContent, color: theme.text }}>장르 : </Text>
              <View style={styles.buttonContainer}>
                {quizType.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={{
                      ...styles.button,
                      backgroundColor:
                        selectedQuizType === type ? theme.kungyaGreenAccent2 : undefined,
                    }}
                    onPress={() => handleQuizTypePress(type)}>
                    <Text
                      style={[
                        { color: theme.text },
                        Font.modalContent,
                        selectedQuizType === type && styles.selectedText,
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ ...Font.modalContent, color: theme.text }}>개수 : </Text>
              <View style={styles.buttonContainer}>
                {quizCount.map((count) => (
                  <TouchableOpacity
                    key={count}
                    style={{
                      ...styles.button,
                      backgroundColor:
                        selectedQuizCount === count ? theme.kungyaGreenAccent2 : undefined,
                    }}
                    onPress={() => handleQuizCountPress(count)}>
                    <Text
                      style={[
                        { color: theme.text },
                        Font.modalContent,
                        selectedQuizCount === count && styles.selectedText,
                      ]}>
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ModalBox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hostWaiting: {
    width: "100%",
  },
  modalBox: {
    width: "100%",
    gap: 10,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 5,
  },
  selectedText: {
    color: "#FDFDFD",
  },
});
