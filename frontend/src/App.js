import React, { useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  Flex,
  IconButton,
  VStack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Divider,
} from "@chakra-ui/react";
import {
  FaBars,
  FaHome,
  FaUtensils,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import Home from "./pages/home";
import Ingredients from "./pages/ingredients";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <Container maxW="container.xl" p={4}>
      {/* Navigation Bar (Hidden for Login & Signup) */}
      {!hideNav && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bg="white"
          px={6}
          py={4}
          zIndex="50"
        >
          <Flex
            align="center"
            justify="space-between"
            maxW="container.lg"
            mx="auto"
          >
            {/* Logo */}
            <Heading
              as={Link}
              to="/"
              size="lg"
              fontWeight={900}
              _hover={{ opacity: 0.8 }}
            >
              Fridget.
            </Heading>

            {/* Desktop Navigation */}
            <Flex display={{ base: "none", md: "flex" }} gap={6}>
              {user ? (
                <>
                  <Button
                    as={Link}
                    to="/"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    as={Link}
                    to="/ingredients"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/ingredients") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                  >
                    Ingredients
                  </Button>
                  <Button
                    as={Link}
                    to="/profile"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/profile") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                  >
                    Profile
                  </Button>
                  <Divider orientation="vertical" />
                  <Button
                    variant="solid"
                    colorScheme="gray"
                    onClick={handleLogout}
                    leftIcon={<FaSignOutAlt />}
                    _hover={{ opacity: 0.8 }}
                    fontSize={13}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="solid"
                  colorScheme="blue"
                >
                  Login
                </Button>
              )}
            </Flex>

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<FaBars />}
              variant="outline"
              onClick={onOpen}
            />
          </Flex>
        </Box>
      )}

      {/* Large Heading (What You Should Cook Today) */}
      {!hideNav && (
        <Box textAlign="center" mt="100px">
          <Heading fontSize="4xl" fontWeight="bold" color="gray.800"></Heading>
        </Box>
      )}

      {/* Mobile Drawer Navigation */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={10}>
            <VStack spacing={4}>
              {user ? (
                <>
                  <Button
                    as={Link}
                    to="/"
                    leftIcon={<FaHome />}
                    w="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                    onClick={onClose}
                  >
                    Home
                  </Button>
                  <Button
                    as={Link}
                    to="/ingredients"
                    leftIcon={<FaUtensils />}
                    w="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/ingredients") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                    onClick={onClose}
                  >
                    Ingredients
                  </Button>
                  <Button
                    as={Link}
                    to="/profile"
                    leftIcon={<FaUser />}
                    w="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                    _after={{
                      content: '""',
                      display: "block",
                      height: "2px",
                      bg: "black",
                      width: isActive("/profile") ? "100%" : "0",
                      transition: "width 0.3s",
                    }}
                    onClick={onClose}
                  >
                    Profile
                  </Button>
                  <Divider />
                  <Button
                    colorScheme="red"
                    w="full"
                    justifyContent="flex-start"
                    leftIcon={<FaSignOutAlt />}
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  colorScheme="blue"
                  w="full"
                  onClick={onClose}
                >
                  Login
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Routes */}
      <Box py={4}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Includes Home) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>

      {/* Footer (Hidden for Login & Signup) */}
      {!hideNav && (
        <Box as="footer" py={4} mt={10} textAlign="center">
          <Text fontSize="sm">© 2025 My App. All rights reserved.</Text>
        </Box>
      )}
    </Container>
  );
}

export default App;
