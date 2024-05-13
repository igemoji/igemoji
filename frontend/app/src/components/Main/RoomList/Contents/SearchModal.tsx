import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, Alert } from "react-native";

import PasswordRoomModal from "./PasswordRoomModal";
import MainModal from "../Modal";

import { enterRoomAxios, searchRoomAxios } from "@/API/Main";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
import { getItem, setItem } from "@/utils/asyncStorage";

export default function SearchModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [roomId, setRoomId] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSearchRoomAxios = async () => {
    try {
      const { data } = await searchRoomAxios(Number(roomId));
      await setItem("roomId", data.data.roomId);
      if (data.data.isPublic) {
        handleEnterRoomAxios(data.data.roomId);
      } else {
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("방을 찾을 수 없습니다.", "", [{ text: "확인" }]);
    }
    setRoomId("");
    close();
  };

  const handleEnterRoomAxios = async (roomId: string) => {
    try {
      const memberId = await getItem("memberId");
      await enterRoomAxios({ roomId: Number(roomId), memberId, password: "" });
      navigation.navigate("Game");
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(error.response.data.message);
      } else {
        Alert.alert(error.response.data.message, "", [{ text: "확인" }]);
      }
    }
  };

  const handleRoomNumberChange = (text: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(text) || text === "") {
      setRoomId(text);
    }
  };

  return (
    <>
      <MainModal
        size="small"
        visible={visible}
        title="searchRoom"
        close={close}
        onPress={handleSearchRoomAxios}>
        <View style={{ flexDirection: "row", width: 300 }}>
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
            value={roomId}
          />
        </View>
      </MainModal>
      <PasswordRoomModal visible={isModalVisible} close={() => setIsModalVisible(false)} />
    </>
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
