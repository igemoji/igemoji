import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, Platform } from "react-native";

import MainModal from "../Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SearchModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [roomNumber, setRoomNumber] = useState("");

  const handleSearchRoomAxios = () => {
    console.log("searchRoom");
  };

  const handleRoomNumberChange = (text: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(text) || text === "") {
      setRoomNumber(text);
    }
  };

  return (
    <MainModal
      size="small"
      visible={visible}
      title="searchRoom"
      close={close}
      onPress={handleSearchRoomAxios}>
      <View
        style={{ flexDirection: "row", width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.7 }}>
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
          onChangeText={handleRoomNumberChange}
          value={roomNumber}
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
});
