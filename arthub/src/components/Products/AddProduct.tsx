import React from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Product, Variant } from "../../types";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Product>();

  const onSubmit = async (formData: Product) => {
    try {
      await axios.post<Product>("product", formData);
      toast({
        title: "Product",
        description: "Product created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
      navigate("/shop");
    } catch (error: any) {
      console.error("Error adding product:", error);
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
    <Box maxW="md" mx="auto" mt={10} p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb="4" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Variant</FormLabel>
          <Select
            {...register("variant", { required: "Variant is required" })}
            placeholder="Select variant"
          >
            {Object.values(Variant).map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            {...register("description", {
              required: "Description is required",
            })}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
            })}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Picture URL</FormLabel>
          <Input
            type="text"
            {...register("pictureUrl", {
              required: "Picture URL is required",
            })}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel>Artist</FormLabel>
          <Input
            type="text"
            {...register("artist", {
              required: "Artist is required",
            })}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
