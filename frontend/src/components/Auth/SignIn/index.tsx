import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View, Dimensions } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

export default function SignIn() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignInAxios = () => {
    navigation.navigate("KakaoLogin");
  };
  return (
    <Background>
      <Logo />
      <View style={{ position: "absolute", bottom: SCREENHEIGHT * 0.1 }}>
        <ModalBox title="signin" onPress={handleSignInAxios}>
          <Text style={{ ...Font.modalContent, color: theme.text }}>
            SNS 로그인으로 간편하게 시작하세요.
          </Text>
        </ModalBox>
      </View>
    </Background>
  );
}
