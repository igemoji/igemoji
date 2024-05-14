import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import Button from "@/components/Button";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

interface ICount {
  quiz: number[];
}

export default function Count({ quiz }: ICount) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { theme } = useContext(ThemeContext);
  const handleGameExit = () => {
    navigation.reset({ routes: [{ name: "RoomList" }] });
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      {/* <Text style={{ ...Font.quizCount, color: theme.text }}>장르 : {genre}</Text> */}
      <Text style={{ ...Font.quizCount, color: theme.text }}>
        문제 수 : {quiz[0]}/{quiz[1]}
      </Text>
      <Button name="miniExit" onPress={handleGameExit} />
    </View>
  );
}
