import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform,
  Alert,
} from "react-native";

import MainModal from "./Modal";

import MusicToggleButton from "@/components/MusicToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SettingModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false); // 텍스트 입력에 포커스되었는지 여부

  const handleTextInputFocus = () => {
    setIsTextInputFocused(true);
  };
  const handleTextInputBlur = () => {
    setIsTextInputFocused(false);
  };

  return (
    <MainModal
      size={isTextInputFocused ? "middle" : "large"}
      visible={visible}
      title="setting"
      close={close}
      onPress={close}>
      {!isTextInputFocused && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: Platform.OS === "web" ? 350 : SCREENWIDTH * 0.7,
          }}>
          <ThemeToggleButton />
          <MusicToggleButton />
        </View>
      )}
      <View
        style={{
          ...styles.box,
          borderColor: theme.grey,
          width: Platform.OS === "web" ? 350 : SCREENWIDTH * 0.7,
        }}>
        <Text
          style={{
            ...Font.modalContent,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 20,
          }}>
          내 정보
        </Text>
        <ChangeNickname
          handleTextInputFocus={handleTextInputFocus}
          handleTextInputBlur={handleTextInputBlur}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.6,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...Font.modalContent,
                fontWeight: "600",
                color: theme.text,
              }}>
              레벨
            </Text>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}> : </Text>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>2</Text>
          </View>
          {/* 애니메이션 */}
          <ProgressBar />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.6,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                ...Font.modalContent,
                fontWeight: "600",
                color: theme.text,
              }}>
              랭킹
            </Text>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}> : </Text>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>2위 </Text>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>
              (1,601점)
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.6,
          }}>
          <View />
          <TouchableOpacity
            style={{
              ...styles.changeNickname,
              shadowColor: theme.black, // 그림자 색상
              backgroundColor: theme.kungyaYello,
              width: 100,
            }}>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>
              회원 탈퇴
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainModal>
  );
}

// 닉네임 입력 컴포넌트
const ChangeNickname = ({
  handleTextInputFocus,
  handleTextInputBlur,
}: {
  handleTextInputFocus: () => void;
  handleTextInputBlur: () => void;
}) => {
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

  const handleNicknameAxios = () => {
    if (!inputValue || isInvalidLength || isDuplicate) {
      if (Platform.OS === "web") {
        window.alert("올바른 닉네임을 입력하세요.");
      } else {
        Alert.alert("경고", "올바른 닉네임을 입력하세요.");
      }
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.6,
      }}>
      <View style={{ marginRight: 10, flex: 1, flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            ...Font.modalContent,
            fontWeight: "600",
            color: theme.text,
          }}>
          닉네임
        </Text>
        <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}> : </Text>
        <TextInput
          placeholderTextColor={theme.text}
          onFocus={handleTextInputFocus}
          onBlur={handleTextInputBlur}
          placeholder="리벨벨"
          style={{
            ...Font.modalContent,
            fontWeight: "600",
            color: theme.text,
            flex: Platform.OS === "web" ? 0 : 1,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme.grey,
            height: 40,
            paddingLeft: 5,
            width: Platform.OS === "web" ? 150 : null,
          }}
          onChangeText={handleTextChange}
          value={inputValue}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.changeNickname,
          shadowColor: theme.black,
          backgroundColor: theme.kungyaYello,
        }}
        onPress={handleNicknameAxios}>
        <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>변경</Text>
      </TouchableOpacity>
      <View style={{ position: "absolute", top: 40, left: 60 }}>
        <Validation isInvalidLength={isInvalidLength} isDuplicate={isDuplicate} />
      </View>
    </View>
  );
};

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

const ProgressBar = () => {
  const { theme } = useContext(ThemeContext);
  const [presentPrice, setPresentPrice] = useState(350);
  const [targetPrice, setTargetPrice] = useState(500);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const percentage = (presentPrice / targetPrice) * 100;

    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [presentPrice, targetPrice]);

  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[styles.progressBarFill, { width }, { backgroundColor: theme.kungyaGreenAccent2 }]}
      />
      <Text style={{ alignSelf: "flex-end", ...Font.mainSmall, color: theme.text }}>
        {presentPrice} / {targetPrice} EXP
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    height: 250,
    justifyContent: "space-around",
  },
  changeNickname: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 3, // 그림자의 흐릿한 정도
    elevation: 5, // 안드로이드에서의 그림자 효과
  },
  progressBarBackground: {
    height: 20,
    width: 150,
    backgroundColor: "#e0e0e0",
    marginTop: 20,
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
  },
});
