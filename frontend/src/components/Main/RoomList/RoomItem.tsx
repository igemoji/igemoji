import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";

import CreateRoomModal from "./CreateRoomModal";
import NotFoundModal from "./NotFoundModal";
import SearchModal from "./SearchModal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import PasswordRoomModal from "./PasswordRoomModal";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RoomItemProps {
  roomNumber: number;
  title: string;
  state: string;
  genre: string;
  isPublic: boolean;
  playerNumber: number;
}

interface States {
  [key: string]: string;
}

interface Genres {
  [key: string]: string;
}

const states: States = {
  waiting: "대기중",
  gaming: "게임중",
};

const genres: Genres = {
  movie: "영화",
  drama: "드라마",
};

export default function RoomItem({
  roomNumber,
  title,
  state,
  genre,
  isPublic,
  playerNumber,
}: RoomItemProps) {
  const { theme } = useContext(ThemeContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePress = () => {
    if (!isPublic) {
      // 비밀방인 경우에만 모달 열기
      setIsModalVisible(true);
    } else {
      navigation.navigate("Game");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={handlePress}>
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Font.mainSmall, color: theme.text }}>{states[state]}</Text>
          <Text style={{ ...Font.mainSmall, color: theme.text }}> - </Text>
          <Text style={{ ...Font.mainSmall, color: theme.text }}>{genres[genre]}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Font.mainLarge, color: theme.text }}>{roomNumber} </Text>
          <Text style={{ ...Font.mainLarge, color: theme.text }}>{title}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginRight: 10, alignItems: "center" }}>
        {!isPublic && <Text style={{ fontSize: 25 }}>🔐 </Text>}
        <Text style={{ ...Font.mainMiddle, color: theme.text }}>{playerNumber}/6</Text>
      </View>
      <View
        style={{
          ...styles.background,
          backgroundColor: state === "waiting" ? theme.kungyaGreen : theme.grey,
        }}
      />
      <PasswordRoomModal visible={isModalVisible} close={closeModal} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
    height: 70,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
    opacity: 0.8,
    zIndex: -1,
  },
});
