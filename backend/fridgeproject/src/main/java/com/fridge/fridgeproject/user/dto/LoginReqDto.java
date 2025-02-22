package com.fridge.fridgeproject.user.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class LoginReqDto {
    private String userId;
    private String userPassword;
}
