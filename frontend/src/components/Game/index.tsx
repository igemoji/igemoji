import { Audio } from "expo-av";
import React, { useContext, useEffect, useState } from "react";

import Background from "./Background";
import Chat from "./Chat";
import Content from "./Content";
import Header from "./Header";

import { MusicContext } from "@/config/Music";
import { gameSocket } from "@/sockets";

const { connect, subscribe, send, disconnect } = gameSocket;

export default function Game() {
  const { sound, setSound, isMusicOn } = useContext(MusicContext);
  const [socketMessage, setSocketMessage] = useState();

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

  const onConnect = () => {
    console.log("소켓 연결 성공");
    subscribe(`/topic/room/3`, (message) => {
      const data = JSON.parse(message.body);
      if (data) {
        setSocketMessage(data);
        console.log("소켓메세지: ", data);
      }
    });

    send("/app/enter", {
      memberId: 6,
      roomId: 3,
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
      <Header />
      <Content socketMessage={socketMessage} />
      <Chat />
    </Background>
  );
}
