import { View } from "react-native";
import WebView from "react-native-webview";

import { kakaoLoginAxios } from "@/API/Auth";
import { NavigationProps } from "@/types/types";
import { setItem } from "@/utils/asyncStorage";

const REST_API_KEY = "eadd974df44f7b7ac3e7d3de4c20f947";
const REDIRECT_URI = "https://back.igemoji.store/oauth2/kakao";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function LoginScreen({ navigation }: NavigationProps) {
  const getCode = async (target: string) => {
    const exp = "code=";
    const condition = target.indexOf(exp);

    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      try {
        const { data } = await kakaoLoginAxios(requestCode);
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
  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
