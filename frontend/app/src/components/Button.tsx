import { useContext } from "react";
import { AwesomeButton } from "react-awesome-button";
import "@/styles/styles.css";

import { Text } from "react-native";

import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { ButtonName } from "@/types/types";

export default function Button({ name, onPress }: { name: ButtonName; onPress: () => void }) {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);

  const handlePress = () => {
    playButtonSound();
    onPress();
  };

  let content;

  if (name === "check") {
    content = (
      <AwesomeButton size="small" type="secondary" onPress={handlePress}>
        <Text style={{ opacity: 0.85, fontSize: 16, fontFamily: "PretendardRegular" }}>확인</Text>
      </AwesomeButton>
    );
  } else if (name === "start") {
    content = (
      <AwesomeButton type="messenger" size="large" onPress={handlePress}>
        <Text
          style={{
            opacity: 0.85,
            fontSize: 16,
            color: "#47473F",
            fontFamily: "PretendardRegular",
          }}>
          게임 시작
        </Text>
      </AwesomeButton>
    );
  } else if (name === "exit") {
    content = (
      <AwesomeButton type="twitter" size="large" onPress={handlePress}>
        <Text
          style={{
            opacity: 0.85,
            fontSize: 16,
            color: "#47473F",
            fontFamily: "PretendardRegular",
          }}>
          나가기
        </Text>
      </AwesomeButton>
    );
  } else if (name === "mainStart") {
    content = (
      <AwesomeButton size="small" type="secondary" onPress={handlePress}>
        <Text style={{ opacity: 0.85, fontSize: 16, fontFamily: "PretendardRegular" }}>
          시작하기
        </Text>
      </AwesomeButton>
    );
  } else {
    content = null;
  }

  return content;
}
