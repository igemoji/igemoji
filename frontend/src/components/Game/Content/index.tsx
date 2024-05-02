import React, { useContext, useState } from "react";
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

import { ThemeContext } from "@/config/Theme";

export default function Content() {
  const { theme } = useContext(ThemeContext);
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // TODO: 백엔드에서 전달받은 데이터로 교체
  const [timeCount, setTimeCount] = useState(5);
  const [quizCount, setQuizCount] = useState([1, 30]);
  const [genre, setGenre] = useState("영화");
  const [nowContent, setNowContent] = useState("hostwaiting");

  const handleNewScreen = (newScreen: string) => {
    setNowContent(newScreen);
  };

  const handleTimerStart = () => {
    setIsPlaying(true);
  };
  const handleTimerStop = () => {
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

      {nowContent === "hostwaiting" && <HostWaiting handleNewScreen={handleNewScreen} />}
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
