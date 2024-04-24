import React, { useContext, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Count from "./Count";
import Emoji from "./Emoji";
import HostWaiting from "./HostWaiting";
import Messages from "./Messages";
import PlayerWaiting from "./PlayerWaiting";
import Similar from "./Similar";
import Timer from "./Timer";

import { ThemeContext } from "@/config/Theme";
import Answer from "./Answer";
import Prompt from "./Prompt";

export default function Content() {
  const { theme } = useContext(ThemeContext);
  const [timeCount, setTimeCount] = useState(60);
  const [quizCount, setQuizCount] = useState([1, 30]);

  return (
    <View style={styles.container}>
      <Timer totalStep={60} nowStep={timeCount} />
      <Count quiz={quizCount} time={timeCount} />
      {/* <Button onPress={() => setCount((prev) => ++prev)} title="1초 증가" />
      <Button onPress={() => setCount((prev) => --prev)} title="1초 감소" /> */}

      {/* <HostWaiting /> */}
      {/* <PlayerWaiting /> */}
      <Emoji />
      {/* <Similar /> */}
      <Answer />
      <Prompt />
      <Messages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
  },
});
