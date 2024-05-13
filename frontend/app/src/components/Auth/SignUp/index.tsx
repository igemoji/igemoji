import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet, Alert, Platform } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import { registNicknameAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";

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

  const handleTextChange = async (text: string) => {
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
        Alert.alert("올바른 닉네임을 입력하세요.", "");
      }
    } else {
      try {
        await registNicknameAxios({ memberId, inputValue });
        if (Platform.OS === "web") {
          window.alert("닉네임 등록이 완료되었습니다.");
          navigation.reset({ routes: [{ name: "Main" }] });
        } else {
          Alert.alert("닉네임 등록이 완료되었습니다.", "", [
            { text: "확인", onPress: () => navigation.reset({ routes: [{ name: "Main" }] }) },
          ]);
        }
      } catch (error: any) {
        console.log(error);
        if (error.response.data.errorCode === "MEM_005") {
          if (Platform.OS === "web") {
            window.alert("이미 존재하는 닉네임입니다.");
          } else {
            Alert.alert("이미 존재하는 닉네임입니다.", "다른 닉네임을 입력해주세요.", [
              { text: "확인" },
            ]);
          }
        }
      }
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Logo />
        <View style={{ position: "absolute", bottom: "10%" }}>
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
                maxLength={8}
              />
              <View style={{ position: "absolute", top: 25 }}>
                <Validation isInvalidLength={isInvalidLength} />
              </View>
            </View>
          </ModalBox>
        </View>
      </View>
    </Background>
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
        <Text style={{ color: "red", fontSize: 12 }}>닉네임은 2 ~ 8글자 입니다.</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
