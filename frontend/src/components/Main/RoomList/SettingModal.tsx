import React, { useContext, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, TextInput } from "react-native";

import MainModal from "./Modal";

import Button from "@/components/Button";
import MusicToggleButton from "@/components/MusicToggleButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { MainModalProps } from "@/types/types";
const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SettingModal({ visible, close }: MainModalProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <MainModal size="large" visible={visible} title="setting" close={close} onPress={close}>
      <View
        style={{ flexDirection: "row", justifyContent: "space-around", width: SCREENWIDTH * 0.7 }}>
        <View
          style={{
            ...styles.button,
            shadowColor: theme.black, // 그림자 색상
            shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
            shadowOpacity: 0.25, // 그림자 투명도
            shadowRadius: 3, // 그림자의 흐릿한 정도
            elevation: 5, // 안드로이드에서의 그림자 효과
            backgroundColor: theme.kungyaYelloLight,
          }}>
          <ThemeToggleButton />
        </View>
        <View
          style={{
            ...styles.button,
            shadowColor: theme.black, // 그림자 색상
            shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
            shadowOpacity: 0.25, // 그림자 투명도
            shadowRadius: 3, // 그림자의 흐릿한 정도
            elevation: 5, // 안드로이드에서의 그림자 효과
            backgroundColor: theme.kungyaYelloLight,
          }}>
          <MusicToggleButton />
        </View>
      </View>
      <View style={{ ...styles.box, borderColor: theme.grey }}>
        <Text
          style={{ ...Font.modalContent, fontWeight: "600", color: theme.text, marginBottom: 20 }}>
          내 정보
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SCREENWIDTH * 0.6,
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
              placeholder="리벨벨"
              style={{
                ...Font.modalContent,
                fontWeight: "600",
                color: theme.text,
                flex: 1,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: theme.grey,
                height: 40,
                paddingLeft: 5,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.changeNickname,
              shadowColor: theme.black, // 그림자 색상
              shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
              shadowOpacity: 0.25, // 그림자 투명도
              shadowRadius: 3, // 그림자의 흐릿한 정도
              elevation: 5, // 안드로이드에서의 그림자 효과
              backgroundColor: theme.kungyaYello,
            }}>
            <Text style={{ ...Font.modalContent, fontWeight: "600", color: theme.text }}>변경</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SCREENWIDTH * 0.6,
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
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: SCREENWIDTH * 0.6,
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
            width: SCREENWIDTH * 0.6,
          }}>
          <View />
          <TouchableOpacity
            style={{
              ...styles.changeNickname,
              shadowColor: theme.black, // 그림자 색상
              shadowOffset: { width: 0, height: 2 }, // 그림자 위치 (가로: 0, 세로: 2)
              shadowOpacity: 0.25, // 그림자 투명도
              shadowRadius: 3, // 그림자의 흐릿한 정도
              elevation: 5, // 안드로이드에서의 그림자 효과
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    opacity: 0.8,
    width: 80,
    height: 80,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    width: SCREENWIDTH * 0.7,
    padding: 10,
    height: 300,
    justifyContent: "space-around",
  },
  changeNickname: {
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
