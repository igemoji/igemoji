import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { TextInput, View, Dimensions, Text, StyleSheet, Alert, Platform } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import { registNicknameAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SignUp({ navigation }: NavigationProps) {
  const { theme } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");
  const [isInvalidLength, setIsInvalidLength] = useState(false);
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
      setInputValue(text);
      setIsInvalidLength(!(text.length >= 2 && text.length <= 8) && !(text.length === 0));
    }
  };

  const handleNicknameAxios = async () => {
    if (!inputValue || isInvalidLength) {
      if (Platform.OS === "web") {
        window.alert("올바른 닉네임을 입력하세요.");
      } else {
        Alert.alert("경고", "올바른 닉네임을 입력하세요.");
      }
    } else {
      try {
        await registNicknameAxios({ memberId, inputValue });
        Alert.alert("닉네임 등록이 완료되었습니다.", "", [
          { text: "확인", onPress: () => navigation.navigate("Main") },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Background>
        <Logo />
        <View style={{ position: "absolute", bottom: SCREENHEIGHT * 0.1 }}>
          <ModalBox title="signup" onPress={handleNicknameAxios}>
            <View>
              <TextInput
                style={{
                  ...styles.textInput,
                  ...Font.modalContent,
                  backgroundColor: theme.white,
                  borderColor: isInvalidLength ? "red" : theme.grey,
                  color: theme.text,
                }}
                placeholder="사용할 닉네임을 입력하세요."
                onChangeText={handleTextChange}
                value={inputValue}
                placeholderTextColor={theme.text}
              />
              <View style={{ position: "absolute", top: 25 }}>
                <Validation isInvalidLength={isInvalidLength} />
              </View>
            </View>
          </ModalBox>
        </View>
      </Background>
    </View>
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
        <Text style={{ color: "red", fontSize: 12 }}>닉네임은 2 ~ 8글자의 문자입니다.</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
