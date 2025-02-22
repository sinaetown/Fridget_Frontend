package com.fridge.fridgeproject.user.dto;

import com.fridge.fridgeproject.user.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResDto {
    private String userId;

    public static UserResDto toUserResDto(User user) {
        UserResDtoBuilder userResDtoBuilder = UserResDto.builder();
        userResDtoBuilder.userId(user.getUserId());
        userResDtoBuilder.userId(user.getName());
        return userResDtoBuilder.build();
    }
}
