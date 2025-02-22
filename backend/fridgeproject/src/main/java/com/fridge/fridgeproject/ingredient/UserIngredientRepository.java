package com.fridge.fridgeproject.ingredient;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserIngredientRepository extends MongoRepository<UserIngredient, String>  {

}
