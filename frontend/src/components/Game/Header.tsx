import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

export default function Header({ socketMessage }: any) {
  const { theme } = useContext(ThemeContext);
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const [roomTitle, setRoomTitle] = useState();
  const [roomId, setRoomId] = useState();
  const [memberList, setMemberList] = useState<any[]>([]);
  const [host, setHost] = useState();

  useEffect(() => {
    if (socketMessage?.message === "ENTER_SUCCESS" || socketMessage?.message === "CHANGE_SET") {
      setRoomTitle(socketMessage.title);
      setRoomId(socketMessage.roomId);
      setMemberList(socketMessage.memberList);
      setHost(socketMessage.host);
    }
  }, [socketMessage]);

  const handleOpenMemberList = () => {
    setIsMemberOpen(!isMemberOpen);
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...Font.header, color: theme.text }}>
        {roomId}번 : {roomTitle}
      </Text>
      <TouchableOpacity
        onPress={handleOpenMemberList}
        style={{
          ...styles.memberListButton,
          borderColor: theme.grey,
          backgroundColor: theme.kungya,
        }}>
        <Text style={{ ...Font.header, color: theme.text }}>인원 : {memberList.length}/6</Text>
      </TouchableOpacity>
      {isMemberOpen && (
        <View
          style={{
            ...styles.memberList,
            backgroundColor: theme.kungya,
            borderColor: theme.grey,
          }}>
          <View style={styles.row}>
            <View style={{ flex: 4 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>닉네임</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>Lv</Text>
            </View>
            <View style={{ flex: 2 }}>
              <Text style={[{ color: theme.text }, Font.memberInfoTitle]}>Rp</Text>
            </View>
          </View>
          {memberList?.map((member, index) => (
            <View key={index} style={styles.row}>
              <View style={{ flex: 4, position: "relative" }}>
                {host && <Image style={styles.image} source={require("~/crown.png")} />}
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>
                  {member.nickname}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>{member.level}</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={[{ color: theme.text }, Font.memberInfoContent]}>
                  {member.rating}점
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
    width: "70%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    position: "absolute",
    left: "-45%",
    top: "-10%",
    resizeMode: "contain",
    height: "150%",
    width: "100%",
  },
});
