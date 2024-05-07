package com.ssafy.igemoji.domain.member.controller;

import com.ssafy.igemoji.domain.member.dto.NicknameRequestDto;
import com.ssafy.igemoji.domain.member.service.MemberService;
import com.ssafy.igemoji.global.common.dto.ResponseFactory;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Tag(name = "맴버 API", description = "맴버 관련 API")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/nickname")
    @Operation(summary = "닉네임 수정", description = "맴버 닉네임 수정 API")
    @Parameter(name = "memberId", description = "닉네임 수정 대상의 memberId")
    @Parameter(name = "nickname", description = "수정할 닉네임")
    public ResponseEntity<?> updateNickname(@RequestBody NicknameRequestDto requestDto){
        memberService.updateNickname(requestDto);
        return ResponseFactory.success("닉네임 수정 완료");
    }

    @GetMapping("/nickname/{nickname}")
    @Operation(summary = "닉네임 중복 체크", description = "맴버 닉네임 중복 체크 API")
    @Parameter(name = "nickname", description = "중복 체크 할 닉네임")
    public ResponseEntity<?> exitNickname(@PathVariable String nickname){
        return ResponseFactory.success("중복 체크 완료", memberService.exitNickname(nickname));
    }

}

