package com.ssafy.igemoji.global.oauth.dto;

import com.ssafy.igemoji.global.oauth.dto.OAuthLoginRequest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
@NoArgsConstructor
public class KakaoLoginRequest implements OAuthLoginRequest {
    private String authorizationCode;

    @Override
    public String getOAuthProvider() {
        return "kakao";
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        return body;
    }
}