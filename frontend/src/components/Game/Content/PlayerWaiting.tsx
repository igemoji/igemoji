import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";

import ModalBox from "@/components/ModalBox";
import { gameSocket } from "@/sockets";

const { disconnect } = gameSocket;

export default function PlayerWaiting() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleGameExit = () => {
    disconnect();
    navigation.navigate("RoomList");
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
    marginBottom: "20%",
  },
  playerWaiting: {
    width: "100%",
  },
});
