import { useState, useEffect, useContext } from "react";
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
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

const Home = () => {
  const API_URL = "http://localhost:8080/recipe/recommend";
  const FETCH_API_URL = "http://localhost:8080/user/ingredients";
  const [isFirstLoad, setIsFirstLoad] = useState(
    !localStorage.getItem("homeLoaded")
  );

  const apiKey = "AIzaSyDsKciyC6XgI1DK9tfpXVrz-MA3obH-Qb4";
  const searchEngineId = "d4ed4b7e4ceb645c9";

  const [imageUrls, setImageUrls] = useState([]);

  const [recipes, setRecipes] = useState([]); // Stores API recipes
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(false); // Error state

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token"); // Get token from localStorage

  const { user } = useContext(AuthContext);
  const [userIngredients, setUserIngredients] = useState([]);

  // Search images based on menuName
  const searchImages = async (menuName) => {
    if (!menuName) return;

    setLoading(true);
    setError(null);
    setImageUrls([]);

    const query = encodeURIComponent(menuName); // Properly encode the search query
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}&searchType=image`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items) {
        return response.data.items[0].link; // Get the first image URL
      } else {
        setError("No images found for this menu item.");
        return null;
      }
    } catch (err) {
      setError("Error fetching images. Please try again.");
      console.error("Error fetching images:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/recipe/recommend", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();
      console.log("DATA: ", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch recipes");
      }

      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      setError(true);
      setLoading(false);
    }
  };

  // Call the function inside useEffect
  useEffect(() => {
    fetchRecipes();
    if (!user?.token) return;

    const fetchImagesForMenuItems = async () => {
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const imgUrl = await searchImages(item.name);
          return { ...item, img: imgUrl || item.img };
        })
      );
      setItems(updatedItems);
    };

    fetchImagesForMenuItems();

    const fetchIngredients = async () => {
      console.log("FETCHING...");

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
        setUserIngredients(data || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        toast.error("Failed to fetch ingredients!", {
          position: "bottom-right",
          autoClose: 4000,
        });
      }
    };

    fetchIngredients();
  }, []);

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Orange Chicken",
      img: "", // Initially empty, will be populated
      ingredients: ["spaghetti", "beef", "tomato", "onion", "garlic"],
      description: "A classic Italian pasta dish with rich meat sauce.",
      nutrition: { calories: 500, fat: "20g", protein: "30g", carbs: "60g" },
    },
    {
      id: 2,
      name: "Chicken Curry",
      img: "",
      ingredients: ["chicken", "onion", "garlic", "curry powder", "rice"],
      description: "A flavorful and aromatic curry with tender chicken.",
      nutrition: { calories: 450, fat: "15g", protein: "35g", carbs: "50g" },
    },
    {
      id: 3,
      name: "Vegetable Stir-Fry",
      img: "",
      ingredients: ["bell pepper", "broccoli", "carrot", "soy sauce", "garlic"],
      description: "A quick and healthy vegetable stir-fry with savory sauce.",
      nutrition: { calories: 300, fat: "10g", protein: "8g", carbs: "45g" },
    },
    {
      id: 4,
      name: "Avocado Toast",
      img: "",
      ingredients: ["bread", "avocado", "egg", "cheese"],
      description: "A healthy and delicious toast topped with avocado & egg.",
      nutrition: { calories: 320, fat: "18g", protein: "12g", carbs: "40g" },
    },
    {
      id: 5,
      name: "Grilled Salmon",
      img: "",
      ingredients: ["salmon", "lemon", "garlic", "butter"],
      description: "Perfectly grilled salmon with a hint of lemon and garlic.",
      nutrition: { calories: 380, fat: "25g", protein: "40g", carbs: "5g" },
    },
    {
      id: 6,
      name: "Classic Cheeseburger",
      img: "",
      ingredients: ["beef patty", "cheese", "lettuce", "tomato", "bun"],
      description: "A juicy grilled cheeseburger with fresh toppings.",
      nutrition: { calories: 650, fat: "35g", protein: "45g", carbs: "50g" },
    },
    {
      id: 7,
      name: "Margarita Pizza",
      img: "",
      ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
      description: "Classic Italian pizza with fresh basil and mozzarella.",
      nutrition: { calories: 600, fat: "22g", protein: "30g", carbs: "70g" },
    },
    {
      id: 8,
      name: "Caesar Salad",
      img: "",
      ingredients: ["lettuce", "chicken", "cheese", "croutons", "dressing"],
      description: "A crisp and fresh Caesar salad with grilled chicken.",
      nutrition: { calories: 300, fat: "15g", protein: "25g", carbs: "20g" },
    },
  ]);

  const displayedRecipes = error ? items : recipes;

  const filteredRecipes = items.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="1300px" mx="auto" px={4}>
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box textAlign="center" mb="30px">
          <Heading fontSize="4xl" fontWeight="bold" color="gray.800">
            What are you cooking today?
          </Heading>
        </Box>
      </motion.div>

      {/* Search Bar */}
      <Flex justify="center" mb={10}>
        <Box width="50%">
          <Input
            placeholder="Search for a recipe..."
            size="lg"
            bg="white"
            border="1px solid black"
            borderRadius="full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            _focus={{
              borderColor: "green.400",
              boxShadow: "0 0 10px rgba(72, 187, 120, 0.5)",
            }}
          />
        </Box>
      </Flex>

      {/* Loading Spinner */}
      {loading && (
        <Flex justify="center" align="center" height="100px">
          <Spinner size="xl" color="green.400" />
        </Flex>
      )}

      {/* Recipe Cards */}
      {!loading && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  maxW="340px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  cursor="pointer"
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    onOpen();
                  }}
                  _hover={{ transform: "scale(1.02)", transition: "0.2s" }}
                >
                  <Image
                    src={recipe.img}
                    alt={recipe.name}
                    width="100%"
                    height="240px"
                    objectFit="cover"
                    borderRadius="10px"
                  />
                  <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={1}>
                      {recipe.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {recipe.description}
                    </Text>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      )}

      {/* Recipe Modal */}
      {selectedRecipe && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay backdropFilter="blur(5px)" />
          <ModalContent borderRadius="lg">
            <ModalHeader>{selectedRecipe.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedRecipe.img}
                alt={selectedRecipe.name}
                width="100%"
                maxHeight="350px"
                borderRadius="lg"
                objectFit="cover"
                mb={4}
              />
              <Text fontSize="lg" fontWeight="bold">
                Ingredients:
              </Text>
              <Text fontSize="md" color="gray.700">
                {selectedRecipe.ingredients?.join(", ") || "Not available"}
              </Text>
              {/* Conditionally render missing ingredients if there are any */}
              {selectedRecipe.ingredients?.filter(
                (ingredient) =>
                  !userIngredients.some(
                    (userIngredient) =>
                      userIngredient.name.toLowerCase() ===
                      ingredient.toLowerCase()
                  )
              ).length > 0 && (
                <>
                  <Text fontSize="lg" fontWeight="bold" color="red.500" mt={2}>
                    Missing Ingredients:
                  </Text>
                  <Text fontSize="md" color="red.500">
                    {selectedRecipe.ingredients
                      ?.filter(
                        (ingredient) =>
                          !userIngredients.some(
                            (userIngredient) =>
                              userIngredient.name.toLowerCase() ===
                              ingredient.toLowerCase()
                          )
                      )
                      .join(", ") || "None"}
                  </Text>
                </>
              )}
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
                Calories: {selectedRecipe.nutrition?.calories || "N/A"} kcal
              </Text>
              <Text fontSize="md" color="gray.700">
                Fat: {selectedRecipe.nutrition?.fat || "N/A"}
              </Text>
              <Text fontSize="md" color="gray.700">
                Protein: {selectedRecipe.nutrition?.protein || "N/A"}
              </Text>
              <Text fontSize="md" color="gray.700">
                Carbs: {selectedRecipe.nutrition?.carbs || "N/A"}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Home;
