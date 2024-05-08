import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Answer from "./Answer";
import Count from "./Count";
import Emoji from "./Emoji";
import EndScore from "./EndScore";
import HostWaiting from "./HostWaiting";
import Messages from "./Messages";
import PlayerWaiting from "./PlayerWaiting";
import Prompt from "./Prompt";
import Similar from "./Similar";
import Timer from "./Timer";
import WaitingScore from "./WaitingScore";

import { getItem } from "@/utils/asyncStorage";

export default function Content({ socketMessage }: any) {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [timeCount, setTimeCount] = useState(5);
  const [quizCount, setQuizCount] = useState([1, 30]);
  const [genre, setGenre] = useState("영화");
  const [answerName, setAnswerName] = useState("");
  const [answerImage, setAnswerImage] = useState("");
  const [nowContent, setNowContent] = useState("hostwaiting");

  useEffect(() => {
    async function setStorage() {
      const roomId = await getItem("roomId");
      const memberId = await getItem("memberId");
      if (socketMessage?.message === "ENTER_SUCCESS" && socketMessage.host.memberId === memberId) {
        setNowContent("hostwaiting");
      }
      if (socketMessage?.gameStatus === "PROCEEDING") {
        setNowContent("quiz");
      }
      if (socketMessage?.gameStatus === "PRINT_ANSWER") {
        setAnswerName(socketMessage.name);
        setAnswerImage(socketMessage.img);
        setNowContent("answer");
      }
      if (socketMessage?.gameStatus === "WAITING") {
        setNowContent("waitingScore");
      }
      if (socketMessage?.gameStatus === "GAME_END") {
        setNowContent("endScore");
      }
    }
    setStorage();
  }, [socketMessage]);

  const handleTimerStart = () => {
    setIsPlaying(true);
  };
  const handleTimerStop = async () => {
    setIsPlaying(false);
  };

  const handleTimerReset = () => {
    setKey((prevKey) => prevKey + 1);
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Timer
        key={key}
        isPlaying={isPlaying}
        duration={60}
        colors={["#FAE738", "#FF5A5A"]}
        colorsTime={[60, 0]}>
        {({ remainingTime }) => remainingTime}
      </Timer>
      {/* <View
        style={{
          flexDirection: "row",
          top: 15,
          right: "10%",
          gap: 5,
          position: "absolute",
          zIndex: 1,
        }}>
        <Button onPress={handleTimerStart} title="시작" />
        <Button onPress={handleTimerStop} title="중지" />
        <Button onPress={handleTimerReset} title="초기화" />
      </View> */}
      <Count quiz={quizCount} time={timeCount} genre={genre} />

      {nowContent === "hostwaiting" && <HostWaiting />}
      {nowContent === "playerWaiting" && <PlayerWaiting />}

      {(nowContent === "quiz" || nowContent === "answer") && <Emoji />}
      {nowContent === "quiz" && <Similar />}
      {nowContent === "answer" && (
        <>
          <Answer />
          <Prompt />
        </>
      )}

      {nowContent === "waitingScore" && <WaitingScore />}
      {nowContent === "endScore" && <EndScore />}

      <Messages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
