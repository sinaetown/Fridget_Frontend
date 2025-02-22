package com.fridge.fridgeproject.ingredient;

import com.fridge.fridgeproject.common.EntityNotFoundException;
import com.fridge.fridgeproject.ingredient.dto.IngredientsReqDto;
import com.fridge.fridgeproject.user.User;
import com.fridge.fridgeproject.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {
    private final UserRepository userRepository;

    public IngredientService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserIngredient> findMyIngredients() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new EntityNotFoundException(
                "There's no such user."));
        return user.getUserIngredients();
    }

    public List<UserIngredient> createIngredients(List<IngredientsReqDto> ingredientsReqDtos) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new EntityNotFoundException(
                "There's no such user."));
        for (IngredientsReqDto dto : ingredientsReqDtos) {
            user.getUserIngredients().add(UserIngredient.toEntity(dto));
        }
        return user.getUserIngredients();
    }
}
