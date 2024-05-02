import { Fontisto } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import SettingModal from "./Main/RoomList/Contents/SettingModal";
import MainModal from "./Main/RoomList/Modal";

import Font from "@/config/Font";
import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);

  const openSettingModal = () => {
    playButtonSound();
    setIsSettingModalVisible(true);
  };

  const closeSettingModal = () => {
    setIsSettingModalVisible(false);
  };

  const goRank = () => {
    playButtonSound();
    navigation.navigate("Rank");
  };

  const goRoomList = () => {
    playButtonSound();
    navigation.navigate("RoomList");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={goRank}>
        <Text style={{ fontSize: 60 }}>🏆</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={goRoomList}>
        <Text style={{ fontSize: 60 }}>🏚️</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={openSettingModal}>
        <Text style={{ fontSize: 60 }}>⚙️</Text>
      </TouchableOpacity>
      <SettingModal visible={isSettingModalVisible} close={closeSettingModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
