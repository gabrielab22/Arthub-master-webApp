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
  useToast,
} from "@chakra-ui/react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/contact", data);

      toast({
        title: "Message sent successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <Heading as="h1" size="xl" textAlign="center">
          Contact Us
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="name" isRequired>
            <FormLabel>Name:</FormLabel>
            <Input type="text" {...register("name")} />
          </FormControl>
          <FormControl id="email" isRequired mt={4}>
            <FormLabel>Email:</FormLabel>
            <Input type="email" {...register("email")} />
          </FormControl>
          <FormControl id="message" isRequired mt={4}>
            <FormLabel>Message:</FormLabel>
            <Input type="text" {...register("message")} />
          </FormControl>
          <Button colorScheme="teal" type="submit" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ContactForm;
