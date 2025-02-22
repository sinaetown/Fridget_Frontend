package com.fridge.fridgeproject.user;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersIngredientsRepository extends MongoRepository<UserIngredient, String>  {

}
