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
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";
import { CgDetailsMore } from "react-icons/cg";
import axios from "axios";
import {
  getUserIdFromToken,
  isAdmin,
  isLoggedIn,
} from "../../utilis/authUtilis";

interface Props {
  product: Product;
  onViewDetails: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onViewDetails }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [availableQuantity, setAvailableQuantity] = useState(product.quantity);

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
      if (isAdmin()) {
        toast({
          title: "Admin Notice",
          description: "You are admin.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const userId = getUserIdFromToken();
      const quantityToAdd = 1;

      if (availableQuantity > 0) {
        try {
          await axios.post("cart-item/add-or-update", {
            userId,
            productId: product.id,
            quantity: quantityToAdd,
          });

          setAvailableQuantity((prevQuantity) => prevQuantity - quantityToAdd);

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
    }
  };

  const handleEdit = (productId: number) => {
    navigate(`/product/edit/${productId}`);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={{ base: 2, sm: 4 }}
    >
      <AspectRatio ratio={1}>
        <Box
          bgImage={`url(${product.pictureUrl})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
      </AspectRatio>
      <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated>
        <Heading size="md" fontSize={{ base: "md", md: "lg" }}>
          {product.name}
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }}>Price: ${product.price}</Text>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Quantity Available: {availableQuantity}
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Artist: {product.artist}
        </Text>
        <Stack direction={{ base: "column", md: "row" }} spacing={2} mt="1">
          <Button
            colorScheme={availableQuantity > 0 ? "blue" : "gray"}
            flex="1"
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => addToCart()}
            isDisabled={availableQuantity <= 0}
          >
            {availableQuantity > 0 ? "Add to Cart" : "Coming Soon"}
          </Button>
          <Button
            rightIcon={<CgDetailsMore />}
            colorScheme="teal"
            variant="outline"
            flex="1"
            fontSize={{ base: "sm", md: "md" }}
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </Stack>

        {isAdmin() && (
          <Stack direction="row" spacing={2} mt="2">
            <Button
              colorScheme="green"
              onClick={() => navigate("/product/add")}
              size={{ base: "xs", md: "sm" }}
            >
              Add
            </Button>
            <Button
              colorScheme="yellow"
              onClick={() => handleEdit(product.id)}
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
          </Stack>
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
