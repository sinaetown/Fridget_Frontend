package com.fridge.fridgeproject.user;

import com.fridge.fridgeproject.ingredient.UserIngredient;
import com.fridge.fridgeproject.user.dto.UserCreateReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "User")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    private String name;
    private String userId;
    private String userPassword;

    private Role role;

    @DBRef
    @Builder.Default
    private List<UserIngredient> userIngredients = new ArrayList<>();

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
