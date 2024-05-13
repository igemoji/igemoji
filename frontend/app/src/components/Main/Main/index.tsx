import React from "react";
import { View, StyleSheet } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";

import Button from "@/components/Button";
import { NavigationProps } from "@/types/types";

export default function Main({ navigation }: NavigationProps) {
  const handleStart = () => {
    navigation.navigate("RoomList");
  };
  return (
    <Background>
      <View style={styles.container}>
        <Logo />
        <View style={{ position: "absolute", bottom: "20%", width: 300 }}>
          <Button name="mainStart" onPress={handleStart} />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
