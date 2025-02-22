import React, { useState } from "react";
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

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", form);
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
