import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import Button from "@/components/Button";
import Font from "@/config/Font";
import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";

interface MainModalProps {
  size: "small" | "middle" | "large";
  visible: boolean;
  title: keyof typeof modalTitle;
  close: () => void;
  children: React.ReactNode;
  onPress: () => void;
}

const modalTitle = {
  setting: "설정",
  createRoom: "방 만들기",
  info: "안내",
  password: "비밀번호 입력",
  searchRoom: "방 번호 입력",
} as const;

const modalHeight = {
  small: 200,
  middle: 400,
  large: 500,
} as const;

export default function MainModal({
  size,
  visible,
  title,
  close,
  children,
  onPress,
}: MainModalProps) {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);
  const handleClose = () => {
    close();
    playButtonSound();
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            style={{
              height: modalHeight[size],
            }}>
            <View>
              <View
                style={{
                  ...styles.modalContent,
                  backgroundColor: theme.kungya,
                  height: modalHeight[size],
                  width: Platform.OS === "web" ? 400 : "80%",
                }}>
                <TouchableOpacity
                  style={{ top: 10, right: 10, position: "absolute" }}
                  onPress={() => {
                    close();
                  }}>
                  <AntDesign name="close" size={24} color={theme.black} />
                </TouchableOpacity>
                <Text style={{ ...Font.modalTitle, color: theme.text }}>{modalTitle[title]}</Text>
                {children}
                <View style={{ width: Platform.OS === "web" ? 300 : "70%" }}>
                  <Button name="check" onPress={onPress} />
                </View>
              </View>
              <View
                style={{
                  ...styles.modalBackContent,
                  backgroundColor: theme.kungyaYelloDark,
                  height: modalHeight[size],
                  width: Platform.OS === "web" ? 400 : "80%",
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  modalBackContent: {
    borderRadius: 10,
    position: "absolute",
    top: 4,
    zIndex: -1,
  },
});