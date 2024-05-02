import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  // TODO: 백엔드에서 전달받은 데이터로 교체
  const room = { number: 18, name: "방 제목입니다", nowPeople: 6 };
  const memberList = [
    {
      host: true,
      level: 1,
      nickname: "이재종안녕하세요",
      rankPoint: 1080,
    },
    {
      host: false,
      level: 20,
      nickname: "김대원123",
      rankPoint: 980,
    },
    {
      host: false,
      level: 20,
      nickname: "김대원123",
      rankPoint: 980,
    },
    {
      host: false,
      level: 20,
      nickname: "김대원123",
      rankPoint: 980,
    },
    {
      host: false,
      level: 20,
      nickname: "김대원123",
      rankPoint: 980,
    },
    {
      host: false,
      level: 20,
      nickname: "김대원123",
      rankPoint: 980,
    },
  ];

  const handleOpenMemberList = () => {
    setIsMemberOpen(!isMemberOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...Font.header, color: theme.text }}>
        {room.number}번 : {room.name}
      </Text>
      <TouchableOpacity
        onPress={handleOpenMemberList}
        style={{
          ...styles.memberListButton,
          borderColor: theme.grey,
          backgroundColor: theme.kungya,
        }}>
        <Text style={{ ...Font.header, color: theme.text }}>인원 : {room.nowPeople}/6</Text>
      </TouchableOpacity>
      {isMemberOpen && (
        <View
          style={{
            ...styles.memberList,
            backgroundColor: theme.kungya,
            borderColor: theme.grey,
          }}>
          <View style={styles.row}>
            <View style={{ flex: 2 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>닉네임</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>레벨</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>랭크</Text>
            </View>
          </View>
          {memberList.map((member, index) => (
            <View key={index} style={styles.row}>
              <View style={{ flex: 2 }}>
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>
                  {member.nickname}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>{member.level}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>
                  {member.rankPoint}점
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memberListButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    // paddingVertical: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  memberList: {
    position: "absolute",
    top: "120%",
    right: 0,
    zIndex: 999,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    width: "60%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
});
