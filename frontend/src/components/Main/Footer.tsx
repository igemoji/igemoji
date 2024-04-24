import { Fontisto } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MainModal from "./RoomList/Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
import SettingModal from "./RoomList/SettingModal";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);

  const openSettingModal = () => {
    setIsSettingModalVisible(true);
  };

  const closeSettingModal = () => {
    setIsSettingModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={() => navigation.navigate("Rank")}>
        <Text style={{ fontSize: 60 }}>🏆</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.kungyaYello }}
        onPress={() => navigation.navigate("RoomList")}>
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
    opacity: 0.8,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
