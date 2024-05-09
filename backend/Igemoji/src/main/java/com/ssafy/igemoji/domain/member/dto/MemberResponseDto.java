package com.ssafy.igemoji.domain.member.dto;

import com.ssafy.igemoji.domain.member.Member;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponseDto {
    private Integer memberId;
    private String nickname;
    private Integer rating;
    private Integer exp;
    private Integer level;

    public static MemberResponseDto toDto(Member member){
        return MemberResponseDto.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .rating(member.getRating())
                .exp(member.getExp())
                .level(member.getLevel())
                .build();
    }
}