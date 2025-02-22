import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Input,
  Select,
  Text,
  Flex,
  CloseButton,
} from "@chakra-ui/react";

const FOOD_CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Meat",
  "Seafood",
  "Dairy",
  "Grains",
  "Legumes",
  "Nuts & Seeds",
  "Herbs & Spices",
  "Oils & Fats",
  "Condiments",
  "Baking",
  "Beverages",
  "Canned Goods",
  "Frozen Foods",
];

const DUMMY_INGREDIENTS = [
  { id: 1, name: "Carrot", category: "Vegetables" },
  { id: 2, name: "Apple", category: "Fruits" },
  { id: 3, name: "Chicken Breast", category: "Meat" },
  { id: 4, name: "Salmon", category: "Seafood" },
  { id: 5, name: "Milk", category: "Dairy" },
  { id: 6, name: "Rice", category: "Grains" },
  { id: 7, name: "Lentils", category: "Legumes" },
  { id: 8, name: "Almonds", category: "Nuts & Seeds" },
];

const Ingredients = () => {
  const [ingredients, setIngredients] = useState(DUMMY_INGREDIENTS);
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIngredient || !selectedCategory) return;

    const ingredient = {
      id: ingredients.length + 1,
      name: newIngredient,
      category: selectedCategory,
    };

    setIngredients([ingredient, ...ingredients]);
    setNewIngredient("");
    setSelectedCategory("");
  };

  const handleDelete = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <Container maxW="container.xl" py={5}>
      <Heading mb={4}>Ingredients</Heading>
      <Box as="form" onSubmit={handleSubmit} mb={4} display="flex" gap={4}>
        <Input
          placeholder="Add ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <Select
          placeholder="Select category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {FOOD_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Button type="submit" colorScheme="blue">
          Add
        </Button>
      </Box>
      {FOOD_CATEGORIES.map((category) => {
        const categoryIngredients = ingredients.filter(
          (ingredient) => ingredient.category === category
        );
        return (
          <Box key={category} mb={6}>
            <Heading size="lg" mb={2}>
              {category}
            </Heading>
            {categoryIngredients.length > 0 ? (
              <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%">
                {categoryIngredients.map((ingredient) => (
                  <Box
                    key={ingredient.id}
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <Flex justify="space-between" align="center">
                      <Box>
                        <Heading size="md">{ingredient.name}</Heading>
                        <Text fontSize="sm" color="gray.600">
                          {ingredient.category}
                        </Text>
                      </Box>
                      <CloseButton
                        size="sm"
                        onClick={() => handleDelete(ingredient.id)}
                      />
                    </Flex>
                  </Box>
                ))}
              </Grid>
            ) : (
              <Text fontSize="md" color="gray.500">
                No ingredients in this category.
              </Text>
            )}
          </Box>
        );
      })}
    </Container>
  );
};

export default Ingredients;
