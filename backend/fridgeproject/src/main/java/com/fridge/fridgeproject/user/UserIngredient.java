package com.fridge.fridgeproject.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "UserIngredient")
public class UserIngredient {
    @Id
    private int id;
    private String name;
}
