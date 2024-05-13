package com.ssafy.igemoji.domain.game.dto;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SimilarResponseDto {
    private String user_input;
    private Double similarity_score;
}
