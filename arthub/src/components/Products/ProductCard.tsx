import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  AspectRatio,
  useToast,
  Stack,
} from "@chakra-ui/react";
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";
import DeleteProductDialog from "./DeleteProductDialog";
import { CgDetailsMore } from "react-icons/cg";

interface Props {
  product: Product;
  onViewDetails: () => void;
}

const ProductCard: React.FC<Props> = ({ product, onViewDetails }) => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState<string | null>(
    localStorage.getItem("isAdmin")
  );

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  window.addEventListener("storage", () => {
    setIsAdmin(localStorage.getItem("isAdmin"));
  });

  const handleBuy = () => {
    console.log(`Buying ${product.name}`);
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
        <Stack direction="row" spacing={4} mt="1">
          <Button colorScheme="blue" flex="7" onClick={handleBuy}>
            Buy
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
