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

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("User Data:", form);
  };

  return (
    <Container
      maxW="lg"
      centerContent
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minH="80vh"
    >
      <Heading mb={6} textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </FormControl>
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
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </FormControl>
          <Button type="submit" colorScheme="brand" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
      <HStack spacing={1} mt={4}>
        <Text>Already have an account?</Text>
        <Button variant="link" colorScheme="brand" as={RouterLink} to="/login">
          Login here
        </Button>
      </HStack>
    </Container>
  );
};

export default SignupPage;
