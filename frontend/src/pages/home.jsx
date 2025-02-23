import { useState } from "react";
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
  Input,
  Flex,
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
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculatePercentage = (ingredients) => {
    const totalIngredients = ingredients.length;
    const availableIngredients = ingredients.filter((ingredient) =>
      ingredientsAvailable.includes(ingredient)
    ).length;
    return Math.round((availableIngredients / totalIngredients) * 100);
  };

  const handleRecipeClick = (item) => {
    setSelectedRecipe(item);
    onOpen();
  };

  return (
    <Box maxW="1200px" mx="auto" py={5}>
      {/* Search Bar */}
      <Flex justify="center" mb={6}>
        <Input
          placeholder="Search for a recipe..."
          size="lg"
          width="50%"
          bg="white"
          borderRadius="full"
          boxShadow="md"
          _focus={{ borderColor: "green.400", boxShadow: "lg" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>

      {/* Recipe Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const percentage = calculatePercentage(item.ingredients);
            return (
              <Box
                key={item.id}
                maxW="300px"
                h="400px"
                bg="white"
                boxShadow="md"
                borderRadius="lg"
                p={4}
                cursor="pointer"
                _hover={{
                  boxShadow: "xl",
                  transition: "0.2s",
                }}
                onClick={() => handleRecipeClick(item)}
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  borderRadius="md"
                  objectFit="cover"
                  boxSize="100%"
                />
                <Text fontSize="xl" fontWeight="bold" mt={8}>
                  {item.label}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {percentage}% of ingredients available
                </Text>
              </Box>
            );
          })
        ) : (
          <Text fontSize="xl" textAlign="center" color="gray.600">
            No matching recipes found.
          </Text>
        )}
      </SimpleGrid>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent borderRadius="lg">
            <ModalHeader>{selectedRecipe.label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedRecipe.img}
                alt={selectedRecipe.label}
                borderRadius="lg"
                mb={4}
              />
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Ingredients:
              </Text>
              <Text fontSize="md" color="gray.700">
                {selectedRecipe.ingredients.join(", ")}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Description:
              </Text>
              <Text fontSize="md" color="gray.700">
                {selectedRecipe.description}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Nutrition:
              </Text>
              <Text fontSize="md" color="gray.700">
                Calories: {selectedRecipe.nutrition.calories} kcal
              </Text>
              <Text fontSize="md" color="gray.700">
                Fat: {selectedRecipe.nutrition.fat}
              </Text>
              <Text fontSize="md" color="gray.700">
                Protein: {selectedRecipe.nutrition.protein}
              </Text>
              <Text fontSize="md" color="gray.700">
                Carbs: {selectedRecipe.nutrition.carbs}
              </Text>
              <Text fontSize="lg" fontWeight="bold" mt={4}>
                Steps:
              </Text>
              <Box as="ol" pl={5}>
                {selectedRecipe.steps.map((step, index) => (
                  <Text key={index} fontSize="md" color="gray.700" mt={2}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Home;
