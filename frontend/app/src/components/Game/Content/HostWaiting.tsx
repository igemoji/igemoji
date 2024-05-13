import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import ModalBox from "@/components/ModalBox";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { gameSocket } from "@/sockets";
import { getItem } from "@/utils/asyncStorage";

const { send } = gameSocket;

export default function HostWaiting({ allQuizCount }: { allQuizCount: number }) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useContext(ThemeContext);
  const quizType = ["영화"];
  const quizCount = [10, 20, 30];
  const [selectedQuizType, setSelectedQuizType] = useState("영화");
  const [selectedQuizCount, setSelectedQuizCount] = useState(allQuizCount);

  const handleQuizTypePress = (type: string) => {
    setSelectedQuizType(type);
  };

  const handleQuizCountPress = async (count: number) => {
    setSelectedQuizCount(count);
    const memberId = await getItem("memberId");
    const roomId = await getItem("roomId");

    send("/app/room/question", {
      memberId,
      roomId,
      questionNum: count,
    });
  };

  const handleGameStart = async () => {
    // const typeMap: Record<string, string> = {
    //   영화: "movie",
    //   드라마: "drama",
    // };
    // const koreanQuizType = typeMap[selectedQuizType];

    const memberId = await getItem("memberId");
    const roomId = await getItem("roomId");
    send("/app/game/start", {
      roomId,
      senderId: memberId,
      // genre: koreanQuizType,
    });
  };

  const handleGameExit = () => {
    navigation.reset({ routes: [{ name: "RoomList" }] });
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
                      backgroundColor: selectedQuizType === type ? theme.kungyaYello : undefined,
                    }}
                    onPress={() => handleQuizTypePress(type)}>
                    <Text
                      style={[
                        { color: theme.text },
                        Font.modalContent,
                        // selectedQuizType === type && styles.selectedText,
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
                      backgroundColor: selectedQuizCount === count ? theme.kungyaYello : undefined,
                    }}
                    onPress={() => handleQuizCountPress(count)}>
                    <Text
                      style={[
                        { color: theme.text },
                        Font.modalContent,
                        // selectedQuizCount === count && styles.selectedText,
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
  // selectedText: {
  //   color: "#FDFDFD",
  // },
});
