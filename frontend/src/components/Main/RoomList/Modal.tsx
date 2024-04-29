import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";

import Button from "@/components/Button";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

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

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={close}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            height: modalHeight[size],
          }}>
          <View
            style={{
              ...styles.modalContent,
              backgroundColor: theme.kungya,
              height: modalHeight[size],
              width: Platform.OS === "web" ? 400 : SCREENWIDTH * 0.8,
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
            <View style={{ width: Platform.OS === "web" ? 300 : SCREENWIDTH * 0.7 }}>
              <Button name="check" onPress={onPress} />
            </View>
          </View>
          <View
            style={{
              ...styles.modalBackContent,
              backgroundColor: theme.kungyaYelloDark,
              height: modalHeight[size],
              width: Platform.OS === "web" ? 400 : SCREENWIDTH * 0.8,
            }}
          />
        </TouchableOpacity>
      </TouchableOpacity>
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
