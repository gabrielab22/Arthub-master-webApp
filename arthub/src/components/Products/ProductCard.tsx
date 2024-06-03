import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<string | null>(
    localStorage.getItem("isAdmin")
  );

  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin"));
  });

  const handleBuy = () => {
    console.log(`Buying ${product.name}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("product/" + product?.id);
      navigate("/shop");
      toast({
        title: "Product Deleted",
        description: `${product.name} has been deleted successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the product.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const handleEdit = (productId: any) => {
    navigate(`/product/edit/${productId}`);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <AspectRatio ratio={1}>
        <Box
          bgImage={`url(${product.pictureUrl})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
      </AspectRatio>
      <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated>
        <Heading size="md">{product.name}</Heading>
        <Text>Price: ${product.price}</Text>
        <Text>Quantity Available: {product.quantity}</Text>
        <Button colorScheme="blue" width="100%" mt="1" onClick={handleBuy}>
          Buy
        </Button>
        {isAdmin == "true" && (
          <Box mt="2">
            <Button
              colorScheme="green"
              onClick={() => navigate("/product/add")}
              mr="2"
              size={{ base: "xs", md: "sm" }}
            >
              Add
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => handleEdit(product.id)}
              mr="2"
              size={{ base: "xs", md: "sm" }}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size={{ base: "xs", md: "sm" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
