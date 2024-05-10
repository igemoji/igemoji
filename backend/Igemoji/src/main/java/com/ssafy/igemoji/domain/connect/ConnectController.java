package com.ssafy.igemoji.domain.connect;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "연결 테스트 API", description = "연결 테스트용 API")
public class ConnectController {
    @GetMapping("/connect")
    @Operation(summary = "연결 테스트", description = "연결 테스트용 API")
    public ResponseEntity<String> connectTest(){
        return ResponseEntity.status(HttpStatus.OK).body("연결에 성공하였습니다.");
    }

    @GetMapping("favicon.ico")
    public void returnNoFavicon(){}
}