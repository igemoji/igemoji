import MainModal from "./Modal";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import React, { useContext, useState } from "react";
import { MainModalProps } from "@/types/types";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function CreateRoomModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [isPublic, setIsPublic] = useState(true); // 상태 추가 및 초기값 설정
  const [showPasswordInput, setShowPasswordInput] = useState(false); // 비밀번호 입력 상태 추가 및 초기값 설정

  // 클릭 핸들러 함수들
  const handleCreateRoomAxios = () => {
    console.log("createRoom");
  };

  const handlePublicClick = () => {
    setIsPublic(true); // 공개 버튼 클릭 시 상태 변경
    setShowPasswordInput(false); // 공개 버튼 클릭 시 비밀번호 입력 상태를 숨김
  };

  const handlePrivateClick = () => {
    setIsPublic(false); // 비공개 버튼 클릭 시 상태 변경
    setShowPasswordInput(true); // 비공개 버튼 클릭 시 비밀번호 입력 상태를 보임
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
          onPress={handlePublicClick} // 공개 버튼 클릭 시 핸들러 호출
          style={{
            ...styles.box,
            backgroundColor: isPublic ? theme.kungyaGreenAccent : theme.grey, // 상태에 따라 색상 변경
          }}>
          <Fontisto name="unlocked" size={24} color={theme.black} />
          <Text style={{ ...Font.modalContent, marginLeft: 10 }}>공개</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePrivateClick} // 비공개 버튼 클릭 시 핸들러 호출
          style={{
            ...styles.box,
            backgroundColor: isPublic ? theme.grey : theme.kungyaGreenAccent, // 상태에 따라 색상 변경
          }}>
          <Fontisto name="locked" size={24} color={theme.black} />
          <Text style={{ ...Font.modalContent, marginLeft: 10 }}>비공개</Text>
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
            backgroundColor: showPasswordInput ? theme.white : theme.grey,
            borderColor: showPasswordInput ? theme.grey : theme.black,
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
