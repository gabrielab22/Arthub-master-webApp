import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Input,
  Flex,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { CartItem, CartItemResponse, Product } from "../../types";
import { getUserIdFromToken } from "../../utilis/authUtilis";
import { useNavigate } from "react-router-dom";

const CartItemComponent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) return;

        const response = await axios.get<CartItemResponse[]>(
          `cart-item/${userId}`
        );
        const formattedCartItems: CartItem[] = response.data.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          product: item.product,
        }));
        setCartItems(formattedCartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
  const handleCheckout = () => {
    console.log("lala", totalPrice);
  };

  return (
    <Center>
      <Box maxW="600px" width="100%">
        <Text fontSize="xl" fontWeight="bold" mb={4} mt={10} textAlign="center">
          Cart Items
        </Text>
        {cartItems.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            p={4}
            mb={4}
            display="flex"
            alignItems="center"
          >
            <Box mr={4} flexShrink={0}>
              <Image
                src={item.product.pictureUrl || ""}
                alt={item.product.name || ""}
                boxSize="100px"
                objectFit="cover"
              />
            </Box>
            <Box flex="1">
              <Text>{item.product.name}</Text>
              <Flex alignItems="center" mt={2}>
                <Box mr={2}>
                  <Button
                    size="sm"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                </Box>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  min={1}
                  max={10} // You can adjust the maximum quantity allowed
                  size="sm"
                  width="50px"
                  mx={2}
                />
                <Box ml={2}>
                  <Button
                    size="sm"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Text ml={4}>Price: ${item.product.price}</Text>
          </Box>
        ))}
        <Box mt={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Total Price: ${totalPrice}
          </Text>
        </Box>
        <Button colorScheme="blue" mt={4} w="100%" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Center>
  );
};

export default CartItemComponent;
