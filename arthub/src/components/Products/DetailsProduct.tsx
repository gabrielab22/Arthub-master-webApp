import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import { Product } from "../../types";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.name || "No Name"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              ARTIST: {product.artist}
            </Text>
            <Image
              src={product.pictureUrl || ""}
              alt={product.name || "Product Image"}
              mt="4"
            />
            <Text mt="4">{product.description}</Text>
            <Text mt="2">Price: ${product.price}</Text>
            <Text mt="2">Quantity Available: {product.quantity}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailsModal;
