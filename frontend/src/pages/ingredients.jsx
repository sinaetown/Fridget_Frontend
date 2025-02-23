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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
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

  const API_URL = "http://your-backend-url/api/ingredients";

  const fetchIngredients = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch ingredients");
      }
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast.error("Failed to fetch ingredients!", { position: "bottom-right" });
    }
  };

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
    toast.success("New ingredient added!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deleteIngredient = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete ingredient");
      }
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
      toast("Successfully deleted ingredient!", {
        position: "bottom-right",
        autoClose: 4000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      toast.error("Failed to delete ingredient!", { position: "bottom-right" });
    }
  };

  /** Confirm deletion */
  const confirmDelete = () => {
    if (ingredientToDelete) {
      deleteIngredient(ingredientToDelete.id);
      setIngredientToDelete(null);
      onClose();
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <ToastContainer />
      <Heading mb={4}>Ingredients</Heading>
      <Box
        as="form"
        onSubmit={handleSubmit}
        mb={4}
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
        <Button w={60} type="submit" colorScheme="brand">
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
                        onClick={() => {
                          setIngredientToDelete(ingredient);
                          onOpen();
                        }}
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
