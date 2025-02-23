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
import { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

const Profile = () => {
  const userId = localStorage.getItem("userId") || "Guest"; // Get username from localStorage

  const user = {
    profilePic: "/logo192.png",
    allergies: ["Gluten", "Peanuts", "Dairy"],
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
        img: "https://slowcookerfoodie.com/wp-content/uploads/2022/03/Spicy-Chicken-Curry-500x500.jpg",
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
    ],
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (item) => {
    setSelectedRecipe(item);
    onOpen();
  };

  return (
    <Flex direction="column" align="center" p={6} maxW="1200px" mx="auto">
      {/* Profile Header */}
      <Flex
        w="full"
        bg="gray.100"
        p={6}
        borderRadius="lg"
        align="center"
        justify="space-between"
        mb={8}
        boxShadow="md"
      >
        <Flex align="center">
          <Image
            src={user.profilePic}
            alt="Profile Picture"
            boxSize="120px"
            borderRadius="full"
            mr={5}
          />
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="gray.700">
              {userId}
            </Text>
          </Box>
        </Flex>

        {/* Allergies Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box p={4} bg="white" borderRadius="lg" boxShadow="md">
            <Text fontSize="lg" fontWeight="bold" mb={2} color="gray.700">
              Allergies
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {user.allergies.length > 0 ? (
                user.allergies.map((allergy, index) => (
                  <Badge key={index} colorScheme="red" fontSize="md" p={2}>
                    {allergy}
                  </Badge>
                ))
              ) : (
                <Text fontSize="md" color="gray.500">
                  No allergies listed.
                </Text>
              )}
            </Flex>
          </Box>
        </motion.div>
      </Flex>

      {/* Recipe History */}
      <Box w="full">
        <Heading fontSize="2xl" fontWeight="bold" color="gray.700" mb={4}>
          Recipes You've Cooked
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {user.item.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Box
                bg="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
                cursor="pointer"
                _hover={{
                  boxShadow: "lg",
                  transition: "0.2s",
                }}
                onClick={() => handleRecipeClick(recipe)}
              >
                <Flex align="center">
                  <Image
                    src={recipe.img}
                    alt={recipe.label}
                    boxSize="100px"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box>
                    <Text fontSize="lg" fontWeight="bold" color="gray.700">
                      {recipe.label}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {recipe.description}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </Box>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent borderRadius="lg">
            <ModalHeader>{selectedRecipe.label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody maxHeight="500px" overflowY="auto">
              {/* Fixed Image Size */}
              <Image
                src={selectedRecipe.img}
                alt={selectedRecipe.label}
                width="100%"
                height="300px"
                borderRadius="lg"
                objectFit="cover"
                mb={4}
              />

              <Text fontSize="lg" fontWeight="bold">
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
    </Flex>
  );
};

export default Profile;
