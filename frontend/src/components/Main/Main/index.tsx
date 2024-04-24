import React, { useContext } from "react";
import { View, Dimensions } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";

import Button from "@/components/Button";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function Main({ navigation }: NavigationProps) {
  const { theme } = useContext(ThemeContext);
  const handleStart = () => {
    navigation.navigate("RoomList");
  };
  return (
    <Background>
      <Logo />
      <View style={{ position: "absolute", bottom: SCREENHEIGHT * 0.2, width: SCREENWIDTH * 0.8 }}>
        <Button name="mainStart" onPress={handleStart} />
      </View>
    </Background>
  );
}
