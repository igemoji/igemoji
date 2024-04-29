import { Fontisto } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import MainModal from "./Main/RoomList/Modal";
import SettingModal from "./Main/RoomList/SettingModal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

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
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
