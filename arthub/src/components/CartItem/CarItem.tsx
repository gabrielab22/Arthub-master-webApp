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
import { CartItem, CartItemResponse } from "../../types";
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
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (item.quantity + 1 > item.product.quantity) {
      alert("Not enough products in stock!");
      return;
    }

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

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await axios.delete(`/cart-item/${cartItemId}`);
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== cartItemId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    navigate("/order", {
      state: { totalPrice: totalPrice, cartItems: cartItems },
    });
  };

  return (
    <Center>
      <Box maxW="600px" width="100%" p={{ base: 4, md: 8 }}>
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
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <Box mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
              <Image
                src={item.product.pictureUrl || ""}
                alt={item.product.name || ""}
                boxSize={{ base: "100%", md: "100px" }}
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
                  max={item.product.quantity}
                  size="sm"
                  width={{ base: "100%", md: "50px" }}
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
            <Text ml={{ base: 0, md: 4 }}>Price: ${item.product.price}</Text>
            <Button
              ml={{ base: 0, md: 4 }}
              mt={{ base: 4, md: 0 }}
              size="sm"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove
            </Button>
          </Box>
        ))}
        <Box mt={4} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Total Price: ${totalPrice}
          </Text>
        </Box>
        {cartItems.length > 0 ? (
          <Button colorScheme="blue" mt={4} w="100%" onClick={handleCheckout}>
            Checkout
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            mt={4}
            w="100%"
            onClick={() => navigate("/shop")}
          >
            Go to shop
          </Button>
        )}
      </Box>
    </Center>
  );
};

export default CartItemComponent;
