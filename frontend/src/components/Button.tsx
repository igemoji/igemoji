import { useContext } from "react";
import AwesomeButton from "react-native-really-awesome-button";

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
      <AwesomeButton
        backgroundColor={theme.kungyaYelloLight}
        backgroundDarker={theme.kungyaYelloDark}
        textColor={theme.text}
        raiseLevel={2}
        stretch
        height={45}
        onPress={handlePress}>
        확인
      </AwesomeButton>
    );
  } else if (name === "start") {
    content = (
      <AwesomeButton
        backgroundColor={theme.kungyaGreen}
        backgroundDarker="#A0E664"
        textColor="#47473F"
        raiseLevel={2}
        stretch
        height={45}
        onPress={handlePress}>
        게임 시작
      </AwesomeButton>
    );
  } else if (name === "exit") {
    content = (
      <AwesomeButton
        backgroundColor={theme.kungyaRed}
        backgroundDarker={theme.kungyaRedDark}
        textColor="#47473F"
        raiseLevel={2}
        stretch
        height={45}
        onPress={handlePress}>
        나가기
      </AwesomeButton>
    );
  } else if (name === "mainStart") {
    content = (
      <AwesomeButton
        backgroundColor={theme.kungyaYelloLight}
        backgroundDarker={theme.kungyaYelloDark}
        borderRadius={100}
        textColor={theme.text}
        raiseLevel={2}
        stretch
        height={45}
        onPress={handlePress}>
        시작하기
      </AwesomeButton>
    );
  } else {
    content = null;
  }

  return content;
}
