package com.fridge.fridgeproject.ingredient;

import com.fridge.fridgeproject.common.CommonResponse;
import com.fridge.fridgeproject.ingredient.dto.IngredientsReqDto;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/user/ingredients")
    public List<UserIngredient> findMyIngredients() {
        return ingredientService.findMyIngredients();

    }

//    @PostMapping("/user/ingredients/create")
//    public ResponseEntity<CommonResponse> createIngredients(List<IngredientsReqDto> ingredientsReqDtos) {
//        List<UserIngredient> userIngredients = ingredientService.createIngredients(ingredientsReqDtos);
//        return new ResponseEntity<>(new CommonResponse(HttpStatus.OK, "Ingredients added!", userIngredients), HttpStatus.OK);
//    }
}
