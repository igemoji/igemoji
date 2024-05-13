package com.ssafy.igemoji.domain.game.client;

import com.ssafy.igemoji.domain.game.dto.SimilarResponseDto;
import com.ssafy.igemoji.domain.oauth.dto.KakaoInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class SimilarApiClient {

    private final RestTemplate restTemplate;

    private String SIMILAR_URI = "https://back.igemoji.store/similar";

    public double requestSimilar(String userAnswer, String correctAnswer){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON); // Update content type

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("user_answer", userAnswer);
        requestBody.put("correct_answer", correctAnswer);

        HttpEntity<?> request = new HttpEntity<>(requestBody, httpHeaders);
        SimilarResponseDto similarResponseDto = restTemplate.postForObject(SIMILAR_URI, request, SimilarResponseDto.class);
        return similarResponseDto != null ? similarResponseDto.getSimilarity_score() : 0.0;
    }
}
