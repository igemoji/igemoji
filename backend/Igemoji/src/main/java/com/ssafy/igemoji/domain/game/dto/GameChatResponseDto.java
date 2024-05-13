package com.ssafy.igemoji.domain.game.dto;

import com.ssafy.igemoji.domain.room.dto.MessageType;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GameChatResponseDto {
    private Integer roomId;
    private String nickname;
    private String content;
    private MessageType message;
    @Setter
    private Double similarScore;
}