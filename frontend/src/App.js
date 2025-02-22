import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, Box, Heading, Text, Button } from "@chakra-ui/react";
import Home from "./pages/home";
import Ingredients from "./pages/ingredients";
import Profile from "./pages/profile";

function App() {
  return (
    <Container maxW="container.lg" p={4}>
      {/* Header with Navigation */}
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
          <Button as={Link} to="/" variant="link" mr={4}>
            Home
          </Button>
          <Button as={Link} to="/ingredients" variant="link" mr={4}>
            Ingredients
          </Button>
          <Button as={Link} to="/profile" variant="link">
            Profile
          </Button>
        </Box>
      </Box>

      {/* Routes */}
      <Box py={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>

      {/* Footer */}
      <Box as="footer" py={4} textAlign="center">
        <Text fontSize="sm">© 2025 My App. All rights reserved.</Text>
      </Box>
    </Container>
  );
}

export default App;
