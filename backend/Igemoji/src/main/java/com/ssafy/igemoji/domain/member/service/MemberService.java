package com.ssafy.igemoji.domain.member.service;

import com.ssafy.igemoji.domain.level.Level;
import com.ssafy.igemoji.domain.level.exception.LevelErrorCode;
import com.ssafy.igemoji.domain.level.repository.LevelRepository;
import com.ssafy.igemoji.domain.member.Member;
import com.ssafy.igemoji.domain.member.dto.MemberInfoResponseDto;
import com.ssafy.igemoji.domain.member.dto.MemberRankDto;
import com.ssafy.igemoji.domain.member.dto.NicknameRequestDto;
import com.ssafy.igemoji.domain.member.dto.RankResponseDto;
import com.ssafy.igemoji.domain.member.exception.MemberErrorCode;
import com.ssafy.igemoji.domain.member.repository.MemberRepository;
import com.ssafy.igemoji.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final LevelRepository levelRepository;

    /* 닉네임 수정 */
    @Transactional
    public void updateNickname(NicknameRequestDto requestDto){
        Member member = memberRepository.findById(requestDto.getMemberId()).orElseThrow(
                () -> new CustomException(MemberErrorCode.NOT_FOUND_MEMBER)
        );
        if(memberRepository.existsByNickname(requestDto.getNickname())){
            throw new CustomException(MemberErrorCode.NICKNAME_DUPLICATE);
        }
        member.updateNickname(requestDto.getNickname());
        memberRepository.save(member);
    }

    /* 랭킹 조회 */
    public RankResponseDto getRank(Integer memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new CustomException(MemberErrorCode.NOT_FOUND_MEMBER)
        );
        Integer rank = memberRepository.getMemberRank(member.getRating());
        MemberRankDto myRank = MemberRankDto.toDto(member, rank + 1);

        List<Member> memberList = memberRepository.getTop10Members();
        List<MemberRankDto> memberRankDtoList = new ArrayList<>();
        for(int i = 0; i < memberList.size(); i++){
            memberRankDtoList.add(MemberRankDto.toDto(memberList.get(i), i+1));
        }

        return new RankResponseDto(myRank, memberRankDtoList);
    }

    /* 닉네임 중복 체크 */
    public boolean exitNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    /* 맴버 조회 */
    public MemberInfoResponseDto getMember(Integer memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MemberErrorCode.NOT_FOUND_MEMBER));

        Level level = levelRepository.findById(member.getLevel())
                .orElseThrow(() -> new CustomException(LevelErrorCode.NOT_FOUND_LEVEL));

        int rank = memberRepository.getMemberRank(member.getRating());
        return MemberInfoResponseDto.toDto(member, rank + 1, level.getExp());
    }


    /* 회원 탈퇴 */
    public void removeMember(Integer memberId) {
        if(!memberRepository.existsById(memberId))
            throw new CustomException(MemberErrorCode.NOT_FOUND_MEMBER);

        memberRepository.deleteById(memberId);
    }

}

