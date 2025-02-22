import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Heading,
  Badge,
  VStack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, React } from "react";

const Profile = () => {
  // Example user data
  const user = {
    profilePic: "/logo192.png", // User's profile picture
    allergies: ["Gluten", "Peanuts", "Dairy"], // User's allergies
    name: "John Doe", // User's name
    item: [
      {
        id: 1,
        label: "Spaghetti Bolognese",
        img: "/Spaghetti.webp",
        ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
        description:
          "A classic Italian pasta dish made with a rich meat sauce.",
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
    ], // History of recipes
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (item) => {
    setSelectedRecipe(item);
    onOpen();
  };

  return (
    <>
      <Flex direction="row" p={4}>
        {/* Profile Section (left 30%) */}
        <Box
          w="30%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mr={4} // Add some margin between sections
        >
          {/* Profile Image */}
          <Image
            src={user.profilePic}
            alt="Profile Picture"
            boxSize="150px"
            borderRadius="full"
            mb={4}
          />
          {/* User Name */}
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            {user.name}
          </Text>

          {/* Allergies Section */}
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.700" mb={2}>
              Allergies:
            </Text>
            <VStack spacing={2} align="start">
              {user.allergies.map((allergy, index) => (
                <Badge key={index} colorScheme="red" fontSize="md">
                  {allergy}
                </Badge>
              ))}
            </VStack>
          </Box>
        </Box>

        {/* Recipe History Section (right 70%) */}
        <Box w="70%" p={4}>
          <Heading fontWeight="bold" color="gray.700" mb={4}>
            Recipes You've Cooked:
          </Heading>
          {/* Recipe List */}
          <Box>
            {user.item.map((recipe) => (
              <Box
                key={recipe.id}
                mb={4}
                display="flex"
                alignItems="center"
                borderWidth="1px"
                borderRadius="lg"
                onClick={() => handleRecipeClick(recipe)}
                _hover={{
                  bg: "brand.600",
                  transform: "scale(1.05)",
                  transition: "0.2s",
                }}
              >
                <Image
                  src={recipe.img}
                  alt={recipe.label}
                  boxSize="100px"
                  borderRadius="md"
                  mr={4}
                />
                <Text fontSize="md" fontWeight="bold" color="gray.700">
                  {recipe.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
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

export default Profile;
