import React, { useState, useContext } from "react";
import {
  Container,
  Input,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token);
      console.log("Login successful, token stored");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      maxW="lg"
      centerContent
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minH="70vh"
    >
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      {error && <Text color="red.500">{error}</Text>}
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full">
            Login
          </Button>
        </VStack>
      </form>
      <HStack spacing={1} mt={4}>
        <Text>Don't have an account?</Text>
        <Button variant="link" colorScheme="brand" as={RouterLink} to="/signup">
          Sign up here
        </Button>
      </HStack>
    </Container>
  );
};

export default LoginPage;
