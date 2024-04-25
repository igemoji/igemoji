import { Fontisto } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import MainModal from "./Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SearchModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);

  const handleSearchRoomAxios = () => {
    console.log("searchRoom");
  };

  return (
    <MainModal
      size="small"
      visible={visible}
      title="searchRoom"
      close={close}
      onPress={handleSearchRoomAxios}>
      <View style={{ flexDirection: "row", width: SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>방 번호:</Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: theme.white,
            borderColor: theme.grey,
            color: theme.black,
          }}
          keyboardType="numeric"
        />
      </View>
    </MainModal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderWidth: 1,
  },
  box: {
    height: 50,
    width: SCREENWIDTH * 0.3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
