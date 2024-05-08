import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import PasswordRoomModal from "./PasswordRoomModal";

import Font from "@/config/Font";
import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { setItem } from "@/utils/asyncStorage";

interface RoomItemProps {
  roomId: number;
  title: string;
  isProgress: boolean;
  // genre: string;
  isPublic: boolean;
  memberNum: number;
}

interface States {
  [key: string]: string;
}

interface Genres {
  [key: string]: string;
}

const genres: Genres = {
  movie: "영화",
  drama: "드라마",
};

export default function RoomItem({
  roomId,
  title,
  isProgress,
  // genre,
  isPublic,
  memberNum,
}: RoomItemProps) {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePress = async () => {
    playButtonSound();
    await setItem("roomId", roomId);
    if (!isPublic) {
      // 비밀방인 경우에만 모달 열기
      setIsModalVisible(true);
    } else {
      navigation.reset({ routes: [{ name: "Game" }] });
    }
  };

  const closeModal = () => {
    playButtonSound();
    setIsModalVisible(false);
  };

  return (
    <TouchableOpacity style={{ ...styles.container }} onPress={handlePress}>
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Font.mainSmall, color: "#000000" }}>
            {isProgress ? "게임 중" : "대기 중"}
          </Text>
          {/* <Text style={{ ...Font.mainSmall, color: "#000000" }}> - </Text> */}
          {/* <Text style={{ ...Font.mainSmall, color: "#000000" }}>{genres[genre]}</Text> */}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ ...Font.mainLarge, color: "#000000" }}>{roomId} </Text>
          <Text style={{ ...Font.mainLarge, color: "#000000" }}>{title}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginRight: 10, alignItems: "center" }}>
        {!isPublic && <Text style={{ fontSize: 25 }}>🔐 </Text>}
        <Text style={{ ...Font.mainMiddle, color: "#000000" }}>{memberNum}/6</Text>
      </View>
      <View
        style={{
          ...styles.background,
          backgroundColor: isProgress ? theme.grey : theme.kungyaGreen,
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
    opacity: 0.7,
    zIndex: -1,
  },
});
