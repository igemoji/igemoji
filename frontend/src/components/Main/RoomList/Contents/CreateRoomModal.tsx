import { Fontisto } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";

import MainModal from "../Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function CreateRoomModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [isPublic, setIsPublic] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [isInvalidLength, setIsInvalidLength] = useState(false);
  const [inputTitle, setInputTitle] = useState("");

  const handleTextChange = (text: string) => {
    // 입력값 길이 확인
    const isValidTitle = /^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]*$/i.test(text);
    if (isValidTitle) {
      setInputTitle(text);
      setIsInvalidLength(!(text.length <= 12));
    }
  };

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

  const handlePasswordChange = (text: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(text) || text === "") {
      if (text.length <= 4) {
        setPassword(text);
      }
    }
  };

  return (
    <MainModal
      size="middle"
      visible={visible}
      title="createRoom"
      close={close}
      onPress={handleCreateRoomAxios}>
      <View
        style={{
          flexDirection: "row",
          width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.7,
          justifyContent: "space-between",
        }}>
        <TouchableOpacity
          onPress={handlePublicClick}
          style={{
            ...styles.box,
            width: Platform.OS === "web" ? 100 : SCREENWIDTH * 0.3,
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
            width: Platform.OS === "web" ? 100 : SCREENWIDTH * 0.3,
            backgroundColor: isPublic ? theme.white : theme.kungyaYello,
            borderColor: isPublic ? theme.grey : theme.grey,
          }}>
          <Fontisto name="locked" size={24} color={theme.black} />
          <Text style={{ ...Font.modalContent, marginLeft: 10, color: theme.text }}>비공개</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flexDirection: "row", width: Platform.OS === "web" ? 320 : SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>제목:</Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: theme.white,
            borderColor: theme.grey,
            color: theme.text,
          }}
          onChangeText={handleTextChange}
          value={inputTitle}
        />
        <View style={{ position: "absolute", top: 23, flexDirection: "row" }}>
          <Text style={{ ...Font.modalContent, color: theme.text, opacity: 0, marginRight: 10 }}>
            제목:
          </Text>
          <Validation isInvalidLength={isInvalidLength} />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", width: Platform.OS === "web" ? 320 : SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>최대 인원 수:</Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: theme.white,
            borderColor: theme.grey,
            color: theme.text,
          }}
          onChangeText={handleTextChange}
          value={inputTitle}
        />
        <View style={{ position: "absolute", top: 23, flexDirection: "row" }}>
          <Text style={{ ...Font.modalContent, color: theme.text, opacity: 0, marginRight: 10 }}>
            최대 인원 수:
          </Text>
          <Validation isInvalidLength={isInvalidLength} />
        </View>
      </View>
      <View
        style={{ flexDirection: "row", width: Platform.OS === "web" ? 320 : SCREENWIDTH * 0.7 }}>
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
          keyboardType="numeric"
          onChangeText={handlePasswordChange}
          value={password}
        />
      </View>
    </MainModal>
  );
}

// 유효성 검사 컴포넌트
interface ValidationProps {
  isInvalidLength: boolean;
}

const Validation = ({ isInvalidLength }: ValidationProps) => {
  return (
    <>
      {isInvalidLength && (
        <Text style={{ color: "red", fontSize: 12 }}>방 제목은 12글자 이하의 문자입니다.</Text>
      )}
    </>
  );
};

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
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
