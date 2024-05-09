import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, Platform, Alert } from "react-native";

import MainModal from "../Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
import { getItem, setItem } from "@/utils/asyncStorage";
import { enterRoomAxios } from "@/API/Main";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function PasswordRoomModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePasswordRoomAxios = async () => {
    try {
      const memberId = await getItem("memberId");
      const roomId = await getItem("roomId");
      const { data } = await enterRoomAxios({ memberId, roomId, password });
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
      size="small"
      visible={visible}
      title="searchRoom"
      close={close}
      onPress={handlePasswordRoomAxios}>
      <View
        style={{ flexDirection: "row", width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.7 }}>
        <Text style={{ ...Font.modalContent, color: theme.text }}>비밀번호:</Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...Font.modalContent,
            backgroundColor: theme.white,
            borderColor: theme.grey,
          }}
          keyboardType="numeric"
          onChangeText={handlePasswordChange}
          value={password}
        />
      </View>
      {password.length > 4 && (
        <Text style={{ ...Font.mainSmall, color: "red" }}>비밀번호는 4자리의 숫자입니다.</Text>
      )}
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
