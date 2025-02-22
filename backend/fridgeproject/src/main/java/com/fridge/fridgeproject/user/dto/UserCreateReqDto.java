package com.fridge.fridgeproject.user.dto;

import com.fridge.fridgeproject.user.Role;
import lombok.Data;

@Data
public class UserCreateReqDto {
    private String name;
    private String userId;
    private String userPassword;
    private Role role;
}
