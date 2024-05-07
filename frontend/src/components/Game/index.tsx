import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";

import Background from "./Background";
import Chat from "./Chat";
import Content from "./Content";
import Header from "./Header";

import { MusicContext } from "@/config/Music";
import { gameSocket } from "@/sockets";
import { getItem } from "@/utils/asyncStorage";

const { connect, subscribe, send, disconnect } = gameSocket;

export default function Game() {
  const { sound, setSound, isMusicOn } = useContext(MusicContext);
  const [socketMessage, setSocketMessage] = useState(null);

  useEffect(() => {
    async function loadSound() {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("~/music/perfect_beauty.mp3")
      );
      setSound(newSound);
      if (sound && isMusicOn) {
        await sound.stopAsync();
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
      if (data) {
        setSocketMessage(data);
        console.log("서 > 클 ", data);
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
      <Content socketMessage={socketMessage} />
      <Chat />
    </Background>
  );
}
