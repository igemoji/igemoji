import { REST_API_KEY, REDIRECT_URI } from "@env";
import { View } from "react-native";
import WebView from "react-native-webview";

import { kakaoLoginAxios } from "@/API/Auth";
import { NavigationProps } from "@/types/types";
import { setItem } from "@/utils/asyncStorage";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function LoginScreen({ navigation }: NavigationProps) {
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
          navigation.reset({ routes: [{ name: "SignUp" }] });
        } else {
          navigation.reset({ routes: [{ name: "Main" }] });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
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
        startInLoadingState
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
