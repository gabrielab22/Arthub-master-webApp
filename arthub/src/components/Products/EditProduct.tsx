import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  console.log("id");
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    quantity: 0,
    pictureUrl: "",
  });

  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "An error occurred while fetching the product.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchProduct();
  }, [productId, toast]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/product/${productId}`, product);
      toast({
        title: "Product Updated",
        description: `${product.name} has been updated successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/shop");
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <Heading size="lg" mb="4">
        Edit Product
      </Heading>
      <FormControl id="name" mb="4">
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="price" mb="4">
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="quantity" mb="4">
        <FormLabel>Quantity</FormLabel>
        <Input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="pictureUrl" mb="4">
        <FormLabel>Picture URL</FormLabel>
        <Input
          type="text"
          name="pictureUrl"
          value={product.pictureUrl}
          onChange={handleChange}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        Update Product
      </Button>
    </Box>
  );
};

export default EditProduct;
