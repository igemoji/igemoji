import React from "react";
import { View, Text } from "react-native";

import Button from "@/components/Button";
import MusicToggleButton from "@/components/MusicToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function SignIn() {
  return (
    <View>
      <ThemeToggleButton />
      <MusicToggleButton />
      <Button name="check">안녕</Button>
      <Text>This is the SignIn screen</Text>
    </View>
  );
}
