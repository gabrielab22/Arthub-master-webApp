// src/App.js or src/App.tsx
import React from "react";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Stack,
  Flex,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

const ContactForm = () => {
  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.100" p={4}>
      <Box
        maxW="xl"
        mx="auto"
        mt={5}
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        width="full"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Contact Us
        </Heading>
        <form>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              mt={4}
              width="full"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default ContactForm;
