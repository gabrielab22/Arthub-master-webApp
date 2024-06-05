import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  AspectRatio,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Product, User } from "../../types";
import { useNavigate } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";
import { CgDetailsMore } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface Props {
  product: Product;
  onViewDetails: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onViewDetails }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<string | null>(
    localStorage.getItem("isAdmin")
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin"));
  });

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user: User = jwtDecode(token);
      return user.id;
    }
    return null;
  };

  const addToCart = async () => {
    if (!isLoggedIn()) {
      toast({
        title: "Login Required",
        description: "You must log in before adding to cart.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const userId = getUserIdFromToken();
      console.log(userId, "user");
      const quantity = 1;
      try {
        await axios.post("/cart-item/add-or-update", {
          userId,
          productId: product.id,
          quantity,
        });

        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error adding the product to your cart.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleEdit = (productId: number) => {
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
        <Stack direction="row" spacing={4} mt="1">
          <Button colorScheme="blue" flex="7" onClick={() => addToCart()}>
            Add to cart
          </Button>
          <Button
            rightIcon={<CgDetailsMore />}
            colorScheme="teal"
            variant="outline"
            flex="3"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </Stack>

        {isAdmin === "true" && (
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
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        productId={product.id}
        productName={product.name || "Unnamed Product"}
      />
    </Box>
  );
};

export default ProductCard;
