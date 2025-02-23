import React, { useState, useContext, useEffect } from "react";
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
import { motion } from "framer-motion";
import CustomDropdown from "../components/CustomDropdown";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

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

const FETCH_API_URL = "http://localhost:8080/user/ingredients";
const ADD_API_URL = "http://localhost:8080/user/ingredients/create";
const DELETE_API_URL = "http://localhost:8080/user/ingredients/delete";

const Ingredients = () => {
  const { user } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredientToDelete, setIngredientToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch user ingredients
  useEffect(() => {
    if (!user?.token) return;

    const fetchIngredients = async () => {
      try {
        const response = await fetch(FETCH_API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ingredients");
        }

        const data = await response.json();
        setIngredients(data || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        toast.error("Failed to fetch ingredients!", {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    };

    fetchIngredients();
  }, [user]);

  // Add ingredient
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newIngredient || !selectedCategory) return;

    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.", {
        position: "bottom-right",
        autoClose: 4000,
      });
      return;
    }

    const ingredient = {
      name: newIngredient,
      category: selectedCategory,
    };

    try {
      const response = await fetch(ADD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([ingredient]), // Send in array format
      });

      if (!response.ok) {
        throw new Error("Failed to add ingredient");
      }

      setIngredients([...ingredients, ingredient]);
      setNewIngredient("");
      setSelectedCategory("");

      toast.success("New ingredient added!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.error("Error adding ingredient:", error);
      toast.error("Failed to add ingredient!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  // Delete ingredient (send in the same array format)
  const confirmDelete = async () => {
    if (!ingredientToDelete) return;

    const token = user?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please log in.", {
        position: "bottom-right",
        autoClose: 4000,
      });
      return;
    }

    try {
      const response = await fetch(DELETE_API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify([
          {
            name: ingredientToDelete.name,
            category: ingredientToDelete.category,
          },
        ]), // Match the format
      });

      if (!response.ok) {
        throw new Error("Failed to delete ingredient");
      }

      setIngredients(
        ingredients.filter(
          (ingredient) => ingredient.name !== ingredientToDelete.name
        )
      );

      setIngredientToDelete(null);
      onClose();

      toast.success("Successfully deleted ingredient!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    } catch (error) {
      console.error("Error deleting ingredient:", error);
      toast.error("Failed to delete ingredient!", {
        position: "bottom-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <Container maxW="container.xl" py={5}>
      <ToastContainer />
      <Heading mb={4}>My Ingredients</Heading>

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
                        key={ingredient.name}
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
