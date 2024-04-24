import React, { useContext, useState } from "react";
import { Text } from "react-native";

import MainModal from "./Modal";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";

export default function NotFoundModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <MainModal size="small" visible={visible} title="info" close={close} onPress={close}>
      <Text style={{ ...Font.modalContent, color: theme.text }}>게임을 찾을 수 없습니다.</Text>
    </MainModal>
  );
}
