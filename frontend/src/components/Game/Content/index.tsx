import React, { useContext, useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import Answer from "./Answer";
import Count from "./Count";
import Emoji from "./Emoji";
import HostWaiting from "./HostWaiting";
import Messages from "./Messages";
import PlayerWaiting from "./PlayerWaiting";
import Prompt from "./Prompt";
import Similar from "./Similar";
import Timer from "./Timer";

import { ThemeContext } from "@/config/Theme";

export default function Content() {
  const { theme } = useContext(ThemeContext);
  const [timeCount, setTimeCount] = useState(60);
  const [quizCount, setQuizCount] = useState([1, 30]);

  return (
    <View style={styles.container}>
      <Timer totalStep={60} nowStep={timeCount} />
      <Count quiz={quizCount} time={timeCount} />
      {/* <Button onPress={() => setTimeCount((prev) => ++prev)} title="1초 증가" />
      <Button onPress={() => setTimeCount((prev) => --prev)} title="1초 감소" /> */}

      <HostWaiting />
      {/* <PlayerWaiting /> */}
      {/* <Emoji /> */}
      {/* <Similar /> */}
      {/* <Answer /> */}
      {/* <Prompt /> */}
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
