import React, { useContext } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";
import Home from "./pages/home";
import Ingredients from "./pages/ingredients";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./context/AuthContext";

function App() {
  const location = useLocation();
  // const { user } = useContext(AuthContext); // Get user from context
  const user = {};
  const { logout } = useContext(AuthContext);
  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    logout(); // Clears the token from localStorage
  };

  return (
    <Container maxW="container.lg" p={4}>
      {/* Header with Navigation (Hidden for Login & Signup) */}
      {!hideNav && (
        <Box
          as="header"
          py={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading as="h1" size="lg">
            APP NAME
          </Heading>
          <Box>
            {user ? (
              <>
                <Button as={Link} to="/" variant="link" mr={4}>
                  Home
                </Button>
                <Button as={Link} to="/ingredients" variant="link" mr={4}>
                  Ingredients
                </Button>
                <Button as={Link} to="/profile" variant="link" mr={4}>
                  Profile
                </Button>
                <Button as={Link} to="/login" variant="link">
                  Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="link">
                Login
              </Button>
            )}
          </Box>
        </Box>
      )}

      {/* Routes */}
      <Box py={4}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Includes Home) */}
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/profile" element={<Profile />} />
          {/* </Route> */}

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
