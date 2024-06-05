import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginCredentials, LoginResponse, User } from "../types";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const toast = useToast();
  const navigate = useNavigate();
  let isAdmin = false;

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const response = await axios.post<LoginResponse>("user/login", data);
      const { token } = response.data;
      const user: User = jwtDecode(token);

      if (user.role === "ADMIN") {
        isAdmin = true;
      }

      localStorage.setItem("isAdmin", isAdmin.toString());
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("storage"));

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      navigate("/shop");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
    >
      <Stack spacing={4}>
        <Heading as="h1" size="xl" textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Text color="red.500">{errors.email.message}</Text>
            )}
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Text color="red.500">{errors.password.message}</Text>
            )}
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full" mt={6}>
            Login
          </Button>
        </form>
      </Stack>
      <Text mt={4} textAlign="center">
        Don't have an account?{" "}
        <Button
          variant="link"
          colorScheme="teal"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </Button>
      </Text>
    </Box>
  );
};

export default Login;
