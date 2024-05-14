import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

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

import { Message } from "@/types/types";
import { getItem } from "@/utils/asyncStorage";

export default function Content({
  socketMessage,
  messages,
}: {
  socketMessage: any;
  messages: Message[];
}) {
  const [key, setKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [hostId, setHostId] = useState(null);
  const [allQuizCount, setAllQuizCount] = useState(10);
  const [nowQuizCount, setNowQuizCount] = useState(10);
  // const [genre, setGenre] = useState("영화");
  const [emoji, setEmoji] = useState(null);
  const [hint1, setHint1] = useState(null);
  const [hint2, setHint2] = useState(null);
  const [answerName, setAnswerName] = useState("");
  const [answerImage, setAnswerImage] = useState("");
  const [answerMember, setAnswerMember] = useState(null);
  const [playerList, setPlayerList] = useState(null);
  const [nowContent, setNowContent] = useState<string | null>(null);

  useEffect(() => {
    async function setStorage() {
      // const roomId = await getItem("roomId");
      const memberId = await getItem("memberId");
      if (
        socketMessage?.message === "ENTER_SUCCESS" ||
        socketMessage?.message === "CHANGE_SET" ||
        socketMessage?.message === "LEAVE_ROOM"
      ) {
        setAllQuizCount(socketMessage.questionNum);
        setNowQuizCount(socketMessage.questionNum);
        setHostId(socketMessage.host?.memberId);

        if (!socketMessage.isProgress) {
          if (socketMessage.host?.memberId === memberId) {
            setNowContent("hostwaiting");
          } else {
            setNowContent("playerWaiting");
          }
        }
      }
      if (socketMessage?.gameStatus === "PROCEEDING") {
        setNowContent("quiz");
        setEmoji(socketMessage.emoji);
        setHint1(socketMessage.hint1);
        setHint2(socketMessage.hint2);
        if (socketMessage.remainingTime === 60) {
          setIsPlaying(true);
        }
      }
      if (socketMessage?.gameStatus === "PRINT_ANSWER") {
        if (socketMessage?.name) {
          setAnswerName(socketMessage.name);
          setAnswerImage(socketMessage.img);
          setAnswerMember(socketMessage.correctMember);
          setNowContent("answer");
          setKey((prevKey) => prevKey + 1);
          setIsPlaying(false);
        }
      }
      if (socketMessage?.gameStatus === "WAITING") {
        setNowContent("waitingScore");
      }
      if (socketMessage?.gameStatus === "ROUND_END") {
        setPlayerList(socketMessage.playerList);
      }
      if (socketMessage?.currentRound) {
        setNowQuizCount(allQuizCount - socketMessage.currentRound);
      }
      if (socketMessage?.gameStatus === "GAME_END") {
        setPlayerList(socketMessage.playerList);
        setNowContent("endScore");
        setNowQuizCount(allQuizCount);
        setTimeout(() => {
          if (hostId === memberId) {
            setNowContent("hostwaiting");
          } else {
            setNowContent("playerWaiting");
          }
        }, 7000);
      }
    }
    setStorage();
  }, [socketMessage]);

  return (
    <View style={styles.container}>
      {nowContent && (
        <>
          <Timer
            key={key}
            isPlaying={isPlaying}
            duration={60}
            colors={["#FAE738", "#FF5A5A"]}
            colorsTime={[60, 0]}>
            {({ remainingTime }) => remainingTime}
          </Timer>
          <Count quiz={[nowQuizCount, allQuizCount]} />
          {nowContent === "hostwaiting" && <HostWaiting allQuizCount={allQuizCount} />}
          {nowContent === "playerWaiting" && <PlayerWaiting />}
          {(nowContent === "quiz" || nowContent === "answer") && (
            <Emoji emoji={emoji} hint1={hint1} hint2={hint2} />
          )}
          {nowContent === "quiz" && <Similar messages={messages} />}
          {nowContent === "answer" && (
            <>
              <Answer answerName={answerName} answerImage={answerImage} />
              <Prompt answerMember={answerMember} />
            </>
          )}
          {nowContent === "waitingScore" && <WaitingScore playerList={playerList} />}
          {nowContent === "endScore" && <EndScore playerList={playerList} />}
          <Messages messages={messages} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
