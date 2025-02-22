package com.fridge.fridgeproject.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class CommonResponse {
    private HttpStatus status;
    private String message;
    private Object result;
}
