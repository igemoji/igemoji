package com.ssafy.igemoji.domain.member.dto;

import com.ssafy.igemoji.domain.member.Member;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberInfoResponseDto {
    private Integer memberId;
    private String nickname;
    private Integer rank;
    private Integer rating;
    private Integer exp;
    private Integer level;
    private Integer level_exp;

    public static MemberInfoResponseDto toDto(Member member, Integer rank,Integer level_exp){
        return MemberInfoResponseDto.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .rank(rank)
                .rating(member.getRating())
                .exp(member.getExp())
                .level(member.getLevel())
                .level_exp(level_exp)
                .build();
    }
}
