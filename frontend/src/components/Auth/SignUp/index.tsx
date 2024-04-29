import React, { useContext, useState } from "react";
import {
  TextInput,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { NavigationProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SignUp({ navigation }: NavigationProps) {
  const { theme } = useContext(ThemeContext);
  const [inputValue, setInputValue] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isInvalidLength, setIsInvalidLength] = useState(false);

  const handleTextChange = (text: string) => {
    // 입력값 길이 확인
    const isValidTitle = /^[^`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]*$/i.test(text);
    if (isValidTitle) {
      setInputValue(text);
      if (text.length === 0) {
        setIsInvalidLength(false);
      } else if (text.length >= 2 && text.length <= 8) {
        setIsInvalidLength(false);
      } else {
        setIsInvalidLength(true);
      }
    }
  };

  const checkDuplicate = () => {
    // 중복 확인 로직 (임시로 구현)
    const isDuplicateValue = false; // 중복이면 true, 중복이 아니면 false
    setIsDuplicate(isDuplicateValue);
  };

  const handleNicknameAxios = () => {
    if (!inputValue || isInvalidLength || isDuplicate) {
      if (Platform.OS === "web") {
        window.alert("올바른 닉네임을 입력하세요.");
      } else {
        Alert.alert("경고", "올바른 닉네임을 입력하세요.");
      }
    } else {
      navigation.navigate("Main");
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
                  borderColor: isDuplicate || isInvalidLength ? "red" : theme.grey,
                  color: theme.text,
                }}
                placeholder="사용할 닉네임을 입력하세요."
                onChangeText={handleTextChange}
                value={inputValue}
                placeholderTextColor={theme.text}
              />
              <View style={{ position: "absolute", top: 25 }}>
                <Validation isInvalidLength={isInvalidLength} isDuplicate={isDuplicate} />
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
  isDuplicate: boolean;
}

const Validation = ({ isInvalidLength, isDuplicate }: ValidationProps) => {
  return (
    <>
      {isInvalidLength && (
        <Text style={{ color: "red", fontSize: 12 }}>닉네임은 2 ~ 8글자의 문자입니다.</Text>
      )}
      {isDuplicate && (
        <Text style={{ color: "red", fontSize: 12 }}>이미 사용 중인 닉네임입니다.</Text>
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
