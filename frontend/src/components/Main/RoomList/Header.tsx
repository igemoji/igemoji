import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";

import CreateRoomModal from "./Contents/CreateRoomModal";
import NotFoundModal from "./Contents/NotFoundModal";
import SearchModal from "./Contents/SearchModal";

import Font from "@/config/Font";
import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function Header({ refresh }: { refresh: () => void }) {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);
  const [createRoomModalVisible, setCreateRoomModalVisible] = useState(false);
  const [notFoundModalVisible, setNotFoundModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const handleCreateRoomPress = () => {
    playButtonSound();
    setCreateRoomModalVisible(true);
  };

  const handleQuickStartPress = () => {
    playButtonSound();
    setNotFoundModalVisible(true);
  };

  const handleSearchPress = () => {
    playButtonSound();
    setSearchModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...styles.largeButton, backgroundColor: theme.kungyaYello, marginRight: 10 }}
          onPress={handleCreateRoomPress}>
          <Text style={{ ...Font.mainLarge, color: theme.text }}>방 만들기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.largeButton, backgroundColor: theme.kungyaYello }}
          onPress={handleQuickStartPress}>
          <Text style={{ ...Font.mainLarge, color: theme.text }}>빠른 입장</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ ...styles.smallButton, backgroundColor: theme.kungyaGreenAccent }}
          onPress={handleSearchPress}>
          <FontAwesome name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.smallButton,
            backgroundColor: theme.kungyaGreenAccent,
            marginLeft: 5,
          }}
          onPress={refresh}>
          <FontAwesome name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <CreateRoomModal
        visible={createRoomModalVisible}
        close={() => setCreateRoomModalVisible(false)}
      />
      <NotFoundModal visible={notFoundModalVisible} close={() => setNotFoundModalVisible(false)} />
      <SearchModal visible={searchModalVisible} close={() => setSearchModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREENWIDTH * 0.9,
  },
  largeButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchRoom: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
});