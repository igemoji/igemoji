import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";

import ModalBox from "@/components/ModalBox";

export default function PlayerWaiting() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleGameExit = () => {
    navigation.reset({ routes: [{ name: "RoomList" }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.playerWaiting}>
        <ModalBox title="playerWaiting" onPress={handleGameExit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerWaiting: {
    width: "100%",
  },
});
