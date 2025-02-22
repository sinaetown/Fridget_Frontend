import { useState, React } from "react";
import { Box, Image, SimpleGrid, Link, Text } from "@chakra-ui/react";

const Home = () => {
  const ingredientsAvailable = [
    "spaghetti",
    "beef",
    "tomato",
    "onion",
    "garlic",
    "cheese",
    "lettuce",
    "tortilla",
    "chicken",
    "rice",
  ];
  const items = [
    {
      id: 1,
      label: "Spaghetti Bolognese",
      img: "/spaghetti.jpg",
      url: "https://www.google.com",
      ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
    },
    {
      id: 2,
      label: "Chicken Curry",
      img: "/chicken-curry.jpg",
      url: "https://github.com",
      ingredients: ["chicken", "onion", "garlic", "curry powder", "rice"],
    },
    {
      id: 3,
      label: "Vegetable Stir Fry",
      img: "/stir-fry.jpg",
      url: "https://twitter.com",
      ingredients: ["rice", "onion", "garlic", "broccoli", "carrot"],
    },
    {
      id: 4,
      label: "Tacos",
      img: "/tacos.jpg",
      url: "https://twitter.com",
      ingredients: ["lettuce", "tortilla", "chicken", "tomato", "cheese"],
    },
  ];

  const calculatePercentage = (ingredients) => {
    const totalIngredients = ingredients.length;
    const availableIngredients = ingredients.filter((ingredient) =>
      ingredientsAvailable.includes(ingredient)
    ).length;
    return Math.round((availableIngredients / totalIngredients) * 100);
  };
  return (
    <SimpleGrid columns={[2, 3]} spacingX={4} spacingY={10}>
      {items.map((item) => {
        const percentage = calculatePercentage(item.ingredients);

        return (
          <Link
            key={item.id}
            href={item.url}
            isExternal
            _hover={{ textDecor: "none" }}
          >
            <Box
              w="300px"
              h="350px"
              bg="rgba(21, 150, 56, 0.6)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              borderRadius="md"
              boxShadow="md"
              _hover={{
                bg: "rgba(21, 150, 56, 0.8)",
                transform: "scale(1.05)",
                transition: "0.2s",
              }}
            >
              <Image
                src={item.img}
                alt={item.label}
                boxSize="250px"
                border="2px solid"
                borderColor="blue.500"
                borderRadius="md"
              />
              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                {item.label}
              </Text>
              <Text fontSize="md" fontWeight="bold" color="whiteAlpha.800">
                {percentage}% of ingredients you have
              </Text>
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export default Home;
