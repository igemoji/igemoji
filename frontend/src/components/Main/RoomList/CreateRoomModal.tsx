import { Fontisto } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import MainModal from "./Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function CreateRoomModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [isPublic, setIsPublic] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // 클릭 핸들러 함수들
  const handleCreateRoomAxios = () => {
    console.log("createRoom");
  };

  const handlePublicClick = () => {
    setIsPublic(true);
    setShowPasswordInput(false);
  };

  const handlePrivateClick = () => {
    setIsPublic(false);
    setShowPasswordInput(true);
  };

  return (
    <MainModal
      size="middle"
      visible={visible}
      title="createRoom"
      close={close}
      onPress={handleCreateRoomAxios}>
      <View
        style={{ flexDirection: "row", width: SCREENWIDTH * 0.7, justifyContent: "space-between" }}>
        <TouchableOpacity
          onPress={handlePublicClick}
          style={{
            ...styles.box,
            backgroundColor: isPublic ? theme.kungyaYello : theme.white,
            borderColor: isPublic ? theme.grey : theme.grey,
          }}>
          <Fontisto name="unlocked" size={24} color={theme.black} />
          <Text style={{ ...Font.modalContent, marginLeft: 10, color: theme.text }}>공개</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePrivateClick}
          style={{
            ...styles.box,
            backgroundColor: isPublic ? theme.white : theme.kungyaYello,
            borderColor: isPublic ? theme.grey : theme.grey,
          }}>
          <Fontisto name="locked" size={24} color={theme.black} />
          <Text style={{ ...Font.modalContent, marginLeft: 10, color: theme.text }}>비공개</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", width: SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>제목:</Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: theme.white,
            borderColor: theme.grey,
            color: theme.text,
          }}
        />
      </View>
      <View style={{ flexDirection: "row", width: SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>비밀번호:</Text>
        <TextInput
          editable={!isPublic}
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: showPasswordInput ? theme.white : theme.kungyaYello,
            borderColor: theme.grey,
            color: theme.text,
          }}
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
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
