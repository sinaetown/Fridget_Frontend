package com.fridge.fridgeproject.user;

import com.fridge.fridgeproject.user.dto.UserCreateReqDto;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.List;

@Data
@Document(collection = "User")
@Builder
public class User {
    @Id
    private String id;
    private String name;
    private String userId;
    private String userPassword;

    private Role role;

    @DBRef
    private List<UserIngredient> userIngredients;

    public static User toEntity(UserCreateReqDto userCreateReqDto) {
        UserBuilder userBuilder = User.builder();
        userBuilder.name(userCreateReqDto.getName())
                .userId(userCreateReqDto.getUserId())
                .userPassword(userCreateReqDto.getUserPassword());
        if (userCreateReqDto.getRole() == null) {
            userBuilder.role(Role.USER);
        } else {
            userBuilder.role(userCreateReqDto.getRole());
        }
        return userBuilder.build();
    }
}
