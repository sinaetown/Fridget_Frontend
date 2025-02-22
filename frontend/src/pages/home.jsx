import { useState, React } from "react";
import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

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
      img: "/Spaghetti.webp",
      ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
      description: "A classic Italian pasta dish made with a rich meat sauce.",
      nutrition: {
        calories: 500,
        fat: "20g",
        protein: "30g",
        carbs: "60g",
      },
      steps: [
        "Cook spaghetti according to package instructions.",
        "Brown the beef in a pan.",
        "Add tomatoes, onions, and garlic to the beef and simmer.",
        "Mix the sauce with the spaghetti and serve.",
      ],
    },
    {
      id: 2,
      label: "Chicken Curry",
      img: "/chicken-curry.jpg",
      ingredients: ["chicken", "onion", "garlic", "curry powder", "rice"],
      description: "A flavorful and aromatic curry with tender chicken.",
      nutrition: {
        calories: 450,
        fat: "15g",
        protein: "35g",
        carbs: "50g",
      },
      steps: [
        "Cook rice as per package instructions.",
        "Cook chicken and onion in a pan with curry powder.",
        "Add garlic and simmer until fully cooked.",
        "Serve chicken curry over rice.",
      ],
    },
    {
      id: 3,
      label: "Vegetable Stir Fry",
      img: "/stir-fry.jpg",
      ingredients: ["rice", "onion", "garlic", "broccoli", "carrot"],
      description: "A healthy stir fry packed with fresh vegetables.",
      nutrition: {
        calories: 350,
        fat: "10g",
        protein: "8g",
        carbs: "55g",
      },
      steps: [
        "Cook rice as per package instructions.",
        "Stir fry onions, garlic, broccoli, and carrots.",
        "Combine vegetables with rice and stir-fry together.",
        "Serve hot.",
      ],
    },
    {
      id: 4,
      label: "Tacos",
      img: "/tacos.jpg",
      ingredients: ["lettuce", "tortilla", "chicken", "tomato", "cheese"],
      description:
        "Delicious tacos filled with seasoned chicken and fresh toppings.",
      nutrition: {
        calories: 350,
        fat: "12g",
        protein: "25g",
        carbs: "40g",
      },
      steps: [
        "Cook chicken and season with spices.",
        "Warm tortillas.",
        "Fill tortillas with chicken, lettuce, tomato, and cheese.",
        "Serve with your favorite salsa.",
      ],
    },
  ];

  const calculatePercentage = (ingredients) => {
    const totalIngredients = ingredients.length;
    const availableIngredients = ingredients.filter((ingredient) =>
      ingredientsAvailable.includes(ingredient)
    ).length;
    return Math.round((availableIngredients / totalIngredients) * 100);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to handle recipe click and open modal
  const handleRecipeClick = (item) => {
    setSelectedRecipe(item);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={[2, 3]} spacingX={4} spacingY={10}>
        {items.map((item) => {
          const percentage = calculatePercentage(item.ingredients);
          return (
            <Box
              key={item.id}
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
              onClick={() => handleRecipeClick(item)} // Open modal on click
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
          );
        })}
      </SimpleGrid>

      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent>
            <ModalHeader>{selectedRecipe.label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedRecipe.img}
                alt={selectedRecipe.label}
                boxSize="100%"
                borderRadius="md"
                mb={4}
              />
              <Text fontSize="md" mt={4}>
                <strong>Ingredients:</strong>{" "}
                {selectedRecipe.ingredients.join(", ")}
              </Text>
              <Text fontSize="md" mt={2}>
                <strong>Description:</strong> {selectedRecipe.description}
              </Text>
              <Text fontSize="md" mt={2}>
                <strong>Nutrition:</strong>
              </Text>
              <Text fontSize="md" mt={1}>
                Calories: {selectedRecipe.nutrition.calories} kcal
              </Text>
              <Text fontSize="md" mt={1}>
                Fat: {selectedRecipe.nutrition.fat}
              </Text>
              <Text fontSize="md" mt={1}>
                Protein: {selectedRecipe.nutrition.protein}
              </Text>
              <Text fontSize="md" mt={1}>
                Carbs: {selectedRecipe.nutrition.carbs}
              </Text>

              <Text fontSize="md" mt={4}>
                <strong>Step-by-Step Recipe:</strong>
              </Text>
              <ol>
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index}>
                    <Text fontSize="md" mt={1}>
                      {step}
                    </Text>
                  </li>
                ))}
              </ol>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Home;
