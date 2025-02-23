import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Input,
  Text,
  Flex,
  CloseButton,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import Framer Motion
import CustomDropdown from "../components/CustomDropdown";
import { ToastContainer, toast } from "react-toastify";

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
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newIngredient || !selectedCategory) return;

    const ingredient = {
      id: ingredients.length + 1,
      name: newIngredient,
      category: selectedCategory,
    };

    setIngredients([...ingredients, ingredient]);
    setNewIngredient("");
    setSelectedCategory("");

    toast.success("New ingredient added!", {
      position: "bottom-right",
      autoClose: 4000,
    });
  };

  const confirmDelete = () => {
    if (ingredientToDelete) {
      setIngredients(
        ingredients.filter(
          (ingredient) => ingredient.id !== ingredientToDelete.id
        )
      );
      setIngredientToDelete(null);
      onClose();
      toast.success("Successfully deleted ingredient!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <ToastContainer />
      <Heading mb={4}>Ingredients</Heading>

      {/* Add Ingredient Form */}
      <Box
        as="form"
        onSubmit={handleSubmit}
        mb={6}
        display="flex"
        gap={4}
        alignItems="center"
      >
        <Input
          placeholder="Add ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <CustomDropdown
          options={FOOD_CATEGORIES}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select category"
        />
        <Button w={60} type="submit" colorScheme="green">
          Add
        </Button>
      </Box>

      {/* Categories in a Single Row */}
      <Grid
        templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={6}
        mb={6}
      >
        {FOOD_CATEGORIES.map((category, index) => {
          const categoryIngredients = ingredients.filter(
            (ingredient) => ingredient.category === category
          );

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                bg="gray.50"
                shadow="sm"
              >
                {/* Category Title */}
                <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
                  {category}
                </Text>

                {/* Ingredients under Category */}
                <VStack spacing={2} align="stretch">
                  {categoryIngredients.length > 0 ? (
                    categoryIngredients.map((ingredient) => (
                      <motion.div
                        key={ingredient.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Flex
                          bg="white"
                          p={2}
                          borderRadius="md"
                          shadow="xs"
                          justify="space-between"
                          align="center"
                        >
                          <Text fontSize="md">{ingredient.name}</Text>
                          <CloseButton
                            size="sm"
                            onClick={() => {
                              setIngredientToDelete(ingredient);
                              onOpen();
                            }}
                          />
                        </Flex>
                      </motion.div>
                    ))
                  ) : (
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      No ingredients
                    </Text>
                  )}
                </VStack>
              </Box>
            </motion.div>
          );
        })}
      </Grid>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete{" "}
              <strong>{ingredientToDelete?.name}</strong>?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Ingredients;
