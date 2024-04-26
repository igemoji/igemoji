import React, { useContext } from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";

import Button from "@/components/Button";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

interface MainModalProps {
  title: keyof typeof modalTitle;
  children?: React.ReactNode;
  onPress: () => void;
  onPress2?: () => void;
}

const modalTitle = {
  playerWaiting: "게임 시작을 기다리고 있습니다.",
  hostWaiting: "방 설정",
  signin: "SNS 로그인",
  signup: "닉네임 설정",
} as const;

const modalHeight = {
  // hostWaiting: SCREENHEIGHT * 0.3,
  // playerWaiting: SCREENHEIGHT * 0.15,
  hostWaiting: 300,
  playerWaiting: 150,
  signin: 200,
  signup: 200,
} as const;

export default function ModalBox({ title, children, onPress, onPress2 }: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        height: modalHeight[title],
        width: "100%",
      }}>
      <View
        style={{
          ...styles.modalContent,
          backgroundColor: theme.kungya,
          height: modalHeight[title],
        }}>
        <Text style={{ ...Font.modalTitle, color: theme.text }}>{modalTitle[title]}</Text>
        {children}
        <ModalButton title={title} onPress={onPress} onPress2={onPress2} />
      </View>
      <View
        style={{
          ...styles.modalBackContent,
          backgroundColor: theme.kungyaYelloDark,
          height: modalHeight[title],
        }}
      />
    </View>
  );
}

function ModalButton({
  title,
  onPress,
  onPress2,
}: {
  title: keyof typeof modalTitle;
  onPress: () => void;
  onPress2?: () => void;
}) {
  const handlePress2 = onPress2 ? onPress2 : () => {};

  if (title === "playerWaiting") {
    return (
      <View style={{ width: SCREENWIDTH * 0.4 }}>
        <Button name="exit" onPress={onPress} />
      </View>
    );
  } else if (title === "hostWaiting") {
    return (
      <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ width: SCREENWIDTH * 0.4 }}>
          <Button name="start" onPress={onPress} />
        </View>
        <View style={{ width: SCREENWIDTH * 0.4 }}>
          <Button name="exit" onPress={handlePress2} />
        </View>
      </View>
    );
  } else if (title === "signup") {
    return (
      <View style={{ width: 300 }}>
        <Button name="check" onPress={onPress} />
      </View>
    );
  } else {
    return (
      <AwesomeButton
        width={300}
        height={45}
        backgroundColor="#FEE500"
        backgroundDarker="#8B8000"
        borderRadius={10}
        onPress={onPress}
        style={styles.awesomeButton}>
        <Image style={styles.kakaoLogin} source={require("~/kakao/kakaoLogo.png")} />
        <Text style={{ opacity: 0.85, fontSize: 16 }}>카카오 로그인</Text>
      </AwesomeButton>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  modalBackContent: {
    width: "100%",
    borderRadius: 10,
    position: "absolute",
    top: 4,
    zIndex: -1,
  },
  kakaoLogin: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  awesomeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
