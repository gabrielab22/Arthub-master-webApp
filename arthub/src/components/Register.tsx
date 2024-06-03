import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CreateUser, RegistrationResponse } from "../types";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<CreateUser>();

  const onSubmit = async (data: CreateUser) => {
    try {
      const response = await axios.post<RegistrationResponse>(
        "user/register",
        data
      );
      const { user, token } = response.data;

      toast({
        title: "User creation success!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Error registering user:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <Heading as="h1" size="xl" textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>
          <FormControl id="fullname" isRequired mt={4}>
            <FormLabel>Full Name:</FormLabel>
            <Input type="text" {...register("fullname")} />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password:</FormLabel>
            <Input type="password" {...register("password")} />
          </FormControl>
          <FormControl id="address" mt={4}>
            <FormLabel>Address:</FormLabel>
            <Input type="text" {...register("address")} />
          </FormControl>
          <FormControl id="role" isRequired mt={4}>
            <FormLabel>Role:</FormLabel>
            <Select placeholder="Select role" {...register("role")}>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </Select>
          </FormControl>
          <Button colorScheme="teal" type="submit" mt={4}>
            Register
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Register;
