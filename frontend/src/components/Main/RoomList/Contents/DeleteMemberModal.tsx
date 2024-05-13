import React, { useContext } from "react";
import { Modal, Text, View, StyleSheet, Dimensions, Platform, Alert } from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { deleteMemberAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { getItem } from "@/utils/asyncStorage";

interface DeleteMemberModalProps {
  visible: boolean;
  close: () => void;
}

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

const DeleteMemberModal: React.FC<DeleteMemberModalProps> = ({ visible, close }) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleDeleteMember = async () => {
    try {
      const memberId = await getItem("memberId");
      await deleteMemberAxios(Number(memberId));
      navigation.reset({ routes: [{ name: "SignIn" }] });
    } catch (error: any) {
      if (Platform.OS === "web") {
        window.alert(error.response.data.message);
      } else {
        Alert.alert(error.response.data.message, "", [{ text: "확인" }]);
      }
    }
    close();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={{
            ...styles.modalContent,
            backgroundColor: theme.kungya,
            height: 200,
            width: Platform.OS === "web" ? 400 : SCREENWIDTH * 0.8,
          }}>
          <Text style={{ ...Font.modalTitle, color: theme.text }}>회원 탈퇴</Text>
          <Text style={{ ...Font.modalContent, color: theme.text }}>
            정말 회원을 탈퇴하시겠습니까?
          </Text>
          <View style={styles.buttonContainer}>
            <View style={{ width: 100 }}>
              <AwesomeButton
                backgroundColor={theme.kungyaRed}
                backgroundDarker={theme.kungyaRedDark}
                textColor={theme.text}
                style={{ ...Font.modalContent }}
                raiseLevel={2}
                stretch
                height={45}
                onPress={handleDeleteMember}>
                탈퇴
              </AwesomeButton>
            </View>
            <View style={{ width: 100 }}>
              <AwesomeButton
                backgroundColor={theme.kungyaYelloLight}
                backgroundDarker={theme.kungyaYelloDark}
                textColor={theme.text}
                style={{ ...Font.modalContent }}
                raiseLevel={2}
                stretch
                height={45}
                onPress={close}>
                취소
              </AwesomeButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default DeleteMemberModal;
