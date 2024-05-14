import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";

import Background from "./Background";
import Chat from "./Chat";
import Content from "./Content";
import Header from "./Header";

import { MusicContext } from "@/config/Music";
import { gameSocket } from "@/sockets";
import { Message, PlayerInfo } from "@/types/types";
import { getItem } from "@/utils/asyncStorage";

const { connect, subscribe, send, disconnect } = gameSocket;

export default function Game() {
  const { sound, setSound, isMusicOn } = useContext(MusicContext);
  const [socketMessage, setSocketMessage] = useState(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userState, setUserState] = useState<string>("room");

  useEffect(() => {
    async function loadSound() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("~/music/perfect_beauty.mp3")
      );
      if (sound && isMusicOn) {
        await sound.stopAsync();
        setSound(newSound);
        await newSound.setIsLoopingAsync(true);
        await newSound.setVolumeAsync(1);
        await newSound.playAsync();
      }
    }
    loadSound();
  }, []);

  const onConnect = async () => {
    const roomId = await getItem("roomId");
    const memberId = await getItem("memberId");

    subscribe(`/topic/room/${roomId}`, (message) => {
      const data = JSON.parse(message.body);
      if (
        data.message === "ROOM_CHAT" ||
        data?.message === "GAME_CHAT" ||
        data?.message === "WATCH_CHAT"
      ) {
        setMessages((currentMessages) => [...currentMessages, data]);
      } else {
        setSocketMessage(data);
        if (data.message === "ENTER_SUCCESS" || data.message === "LEAVE_ROOM") {
          setMessages((currentMessages) => [
            ...currentMessages,
            {
              content:
                data.message === "ENTER_SUCCESS"
                  ? `${data.senderNickname}님이 입장하셨습니다.`
                  : `${data.senderNickname}님이 퇴장하셨습니다.`,
              message: "SYSTEM_CHAT",
              nickname: "[공지]",
              roomId,
            },
          ]);
          if (data.isProgress && data.senderId === memberId) {
            setUserState("watch");
          }
        }
        if (data.gameStatus === "PRINT_ANSWER") {
          if (data.correctMember) {
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                content: `${data.correctMember}님께서 정답을 맞히셨습니다.`,
                message: "SYSTEM_CHAT",
                nickname: "[공지]",
                roomId,
              },
            ]);
          } else if (data.correctMember === null) {
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                content: "아무도 정답을 맞히지 못했습니다",
                message: "SYSTEM_CHAT",
                nickname: "[공지]",
                roomId,
              },
            ]);
          }
        }
        if (
          data.gameStatus === "ROUND_END" &&
          data.playerList.some((player: PlayerInfo) => player.memberId === memberId)
        ) {
          setUserState("game");
        }
        if (data.gameStatus === "GAME_END") {
          setUserState("room");
        }
      }
    });

    send("/app/room/enter", {
      memberId,
      roomId,
    });
  };

  useEffect(() => {
    connect(onConnect);

    return () => {
      disconnect();
    };
  }, []);

  return (
    <Background>
      <Header socketMessage={socketMessage} />
      <Content socketMessage={socketMessage} messages={messages} />
      <Chat userState={userState} />
    </Background>
  );
}
