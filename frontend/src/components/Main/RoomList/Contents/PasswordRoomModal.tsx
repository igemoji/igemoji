import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, Platform } from "react-native";

import MainModal from "../Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
import { setItem } from "@/utils/asyncStorage";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function PasswordRoomModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePasswordRoomAxios = async () => {
    navigation.reset({ routes: [{ name: "Game" }] });
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
