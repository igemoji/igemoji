import { REST_API_KEY } from "@env";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { Text, View, Dimensions, Platform } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import { kakaoLoginAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { setItem } from "@/utils/asyncStorage";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");
const REDIRECT_URI = "http://localhost:8081";

export default function SignIn() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const getCode = async (target: string) => {
    console.log(target);

    const exp = "code=";
    const condition = target.indexOf(exp);

    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log(requestCode);

      try {
        const { data } = await kakaoLoginAxios(requestCode);
        console.log(data);

        await setItem("nickname", data.data.memberInfo.nickname);
        await setItem("memberId", data.data.memberInfo.memberId);
        if (data.data.memberInfo.nickname === null) {
          navigation.navigate("SignUp");
        } else {
          navigation.navigate("Main");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      const url = window.location.href;
      getCode(url);
    }
  });

  const handleSignInAxios = () => {
    if (Platform.OS === "web") {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    }
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
