import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Modal, Text, View, StyleSheet, Platform, Alert } from "react-native";

import { deleteMemberAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { getItem } from "@/utils/asyncStorage";
import { AwesomeButton } from "react-awesome-button";

interface DeleteMemberModalProps {
  visible: boolean;
  close: () => void;
}

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
            width: 400,
          }}>
          <Text style={{ ...Font.modalTitle, color: theme.text }}>회원 탈퇴</Text>
          <Text style={{ ...Font.modalContent, color: theme.text }}>
            정말 회원을 탈퇴하시겠습니까?
          </Text>
          <View style={styles.buttonContainer}>
            <View style={{ width: 100 }}>
              <AwesomeButton type="twitter" size="large" onPress={handleDeleteMember}>
                <Text style={{ opacity: 0.85, fontSize: 16, fontFamily: "PretendardRegular" }}>
                  탈퇴
                </Text>
              </AwesomeButton>
            </View>
            <View style={{ width: 100 }}>
              <AwesomeButton size="large" type="secondary" onPress={close}>
                <Text style={{ opacity: 0.85, fontSize: 16, fontFamily: "PretendardRegular" }}>
                  취소
                </Text>
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
