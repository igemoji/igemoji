package com.ssafy.igemoji.domain.game.dto;

import com.ssafy.igemoji.domain.room.dto.MessageType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScoreResponseDto {
    private MessageType message;
    private GameStatus gameStatus;
    private List<PlayerResponseDto> playerList;
}