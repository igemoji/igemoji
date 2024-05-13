import { REST_API_KEY, REDIRECT_URI } from "@env";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import Background from "../../Background";
import Logo from "../../Logo";
import ModalBox from "../../ModalBox";

import { kakaoLoginAxios } from "@/API/Auth";
import Font from "@/config/Font";
import { ThemeContext } from "@/config/Theme";
import { setItem } from "@/utils/asyncStorage";

export default function SignIn() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const getCode = async (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);

    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      try {
        const { data } = await kakaoLoginAxios(requestCode);
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
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      getCode(window.location.href);
      url.searchParams.delete("code");
      window.history.replaceState({}, "", url.href);
    }
  }, []);

  const handleSignInAxios = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  };
  return (
    <Background>
      <View style={styles.container}>
        <Logo />
        <View>
          <ModalBox title="signin" onPress={handleSignInAxios}>
            <Text style={{ ...Font.modalContent, color: theme.text }}>
              SNS 로그인으로 간편하게 시작하세요.
            </Text>
          </ModalBox>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
