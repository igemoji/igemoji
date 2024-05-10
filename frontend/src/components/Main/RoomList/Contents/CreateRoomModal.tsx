import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";

import MainModal from "../Modal";

import { createRoomAxios, enterRoomAxios } from "@/API/Main";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
import { setItem } from "@/utils/asyncStorage";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function CreateRoomModal({ visible, close }: MainModalProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { theme } = useContext(ThemeContext);
  const [isPublic, setIsPublic] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [isInvalidLength, setIsInvalidLength] = useState(false);
  const [title, setTitle] = useState("");
  const [memberId, setMemberId] = useState<number>(0);

  useEffect(() => {
    const getMemberId = async () => {
      const id = (await AsyncStorage.getItem("memberId")) as string;
      setMemberId(Number(id));
    };
    getMemberId();
  });

  const handleTextChange = (text: string) => {
    const isValidTitle = /^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]*$/i.test(text);
    if (isValidTitle) {
      setTitle(text);
      setIsInvalidLength(!(text.length <= 12));
    }
  };

  const handleCreateRoomAxios = async () => {
    if (!title.trim() || (!isPublic && !password.trim())) {
      if (Platform.OS === "web") {
        window.alert("올바른 방 정보를 입력하세요.");
      } else {
        Alert.alert("올바른 방 정보를 입력하세요.", "", [{ text: "확인" }]);
      }
      return;
    }
    if (!isPublic && password.trim().length !== 4) {
      if (Platform.OS === "web") {
        window.alert("비밀번호는 4자리입니다.");
      } else {
        Alert.alert("비밀번호는 4자리입니다.", "", [{ text: "확인" }]);
      }
      return;
    }
    try {
      const { data } = await createRoomAxios({
        memberId,
        title,
        isPublic,
        password,
      });
      await setItem("roomId", data.data.roomId);
      handleEnterRoomAxios(data.data.roomId);
      setIsPublic(true);
      setPassword("");
      setTitle("");
      close();
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(error.response.data.message);
      } else {
        Alert.alert(error.response.data.message, "", [{ text: "확인" }]);
      }
      console.log(error);
    }
  };

  const handleEnterRoomAxios = async (roomId: string) => {
    try {
      const { data } = await enterRoomAxios({ roomId: Number(roomId), memberId, password });
      console.log(data);
      navigation.navigate("Game");
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(error.response.data.message);
      } else {
        Alert.alert(error.response.data.message, "", [{ text: "확인" }]);
      }
    }
  };

  const handlePublicClick = () => {
    setIsPublic(true);
    setPassword("");
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
    } else {
      if (Platform.OS === "web") {
        window.alert("비밀번호는 4자리 숫자입니다.");
      } else {
        Alert.alert("비밀번호는 4자리 숫자입니다.", "", [{ text: "확인" }]);
      }
    }
  };

  return (
    <MainModal
      size="middle"
      visible={visible}
      title="createRoom"
      close={() => {
        setPassword("");
        setTitle("");
        setIsPublic(true);
        close();
      }}
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
          value={title}
          maxLength={12}
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
          maxLength={4}
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
        <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          방 제목은 12글자 이하의 문자입니다.
        </Text>
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
