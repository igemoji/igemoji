import { Fontisto } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

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
        <Image source={require("~/trophy.png")} style={{ width: 80, height: 80 }} />
        {/* <Text style={{ fontSize: 60 }}>🏆</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={goRoomList}>
        <Image source={require("~/home.png")} style={{ width: 80, height: 80 }} />
        {/* <Text style={{ fontSize: 60 }}>🏘️</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={openSettingModal}>
        <Image source={require("~/setting.png")} style={{ width: 80, height: 80 }} />
        {/* <Text style={{ fontSize: 60 }}>⚙️</Text> */}
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
    opacity: 0.8,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
});
