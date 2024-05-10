package com.ssafy.igemoji.domain.level.exception;

import com.ssafy.igemoji.global.exception.ErrorCode;

public enum LevelErrorCode implements ErrorCode {

    NOT_FOUND_LEVEL("해당 레벨을 찾을 수 없습니다","MEM_001",404);

    private final String message;
    private final String errorCode;
    private final int statusCode;

    LevelErrorCode(String message, String errorCode, int statusCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }

    @Override
    public int getStatusCode() {
        return statusCode;
    }

}
