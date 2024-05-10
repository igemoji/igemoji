import { FontAwesome } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";

import CreateRoomModal from "./Contents/CreateRoomModal";
import NotFoundModal from "./Contents/NotFoundModal";
import SearchModal from "./Contents/SearchModal";

import { enterFastRoomAxios, enterRoomAxios } from "@/API/Main";
import Font from "@/config/Font";
import { MusicContext } from "@/config/Music";
import { ThemeContext } from "@/config/Theme";
import { getItem, setItem } from "@/utils/asyncStorage";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function Header({ refresh }: { refresh: () => void }) {
  const { theme } = useContext(ThemeContext);
  const { playButtonSound } = useContext(MusicContext);
  const [createRoomModalVisible, setCreateRoomModalVisible] = useState(false);
  const [notFoundModalVisible, setNotFoundModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleCreateRoomPress = () => {
    playButtonSound();
    setCreateRoomModalVisible(true);
  };

  const handleQuickStartPress = async () => {
    playButtonSound();
    try {
      const { data } = await enterFastRoomAxios();
      await setItem("roomId", data.data.roomId);
      handleEnterRoomAxios(data.data.roomId);
    } catch (error) {
      setNotFoundModalVisible(true);
    }
  };

  const handleEnterRoomAxios = async (roomId: string) => {
    try {
      const memberId = await getItem("memberId");
      const { data } = await enterRoomAxios({ roomId: Number(roomId), memberId, password: "" });
      console.log(data);
      navigation.navigate("Game");
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(error.response.data.message);
      } else {
        Alert.alert(error.response.data.message, "", [{ text: "확인" }]);
      }
    }
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
          onPress={() => {
            refresh();
            playButtonSound();
          }}>
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
