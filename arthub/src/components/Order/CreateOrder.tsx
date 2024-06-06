import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Select,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  CartItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../types";
import { getUserIdFromToken } from "../../utilis/authUtilis";
import axios from "axios";

const CreateOrder = () => {
  const toast = useToast();
  const location = useLocation();
  const { totalPrice, cartItems } = location.state;

  const userId = getUserIdFromToken();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethod.CARD
  );

  const handlePaymentMethodChange = (event: any) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const submitOrder = async () => {
    const orderData = {
      userId: userId,
      total: totalPrice,
      status: OrderStatus.PENDING,
      orderItems: cartItems.map((item: CartItem) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      paymentDetail: {
        amount: totalPrice,
        method: selectedPaymentMethod,
        status: PaymentStatus.INPROGRESS,
      },
    };

    try {
      const response = await axios.post("/orders", orderData);
      console.log("Order submitted successfully", response.data);
      toast({
        title: "Order Successful",
        description: "Your order has been placed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while submitting the order. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={10} width="100%" display="flex" justifyContent="center">
      <Box
        maxW={{ base: "90%", md: "600px" }}
        width="100%"
        border="1px"
        borderColor="blue.500"
        p={4}
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Total Price: ${totalPrice}
        </Text>
        <UnorderedList>
          {cartItems.map((item: CartItem, index: number) => (
            <ListItem key={index}>
              {item.product.name} - Quantity: {item.quantity}
            </ListItem>
          ))}
        </UnorderedList>
        <FormControl mt={4}>
          <FormLabel>Payment Method:</FormLabel>
          <Select
            value={selectedPaymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value={PaymentMethod.CARD}>Credit Card</option>
            <option value={PaymentMethod.CASH}>Cash</option>
          </Select>
        </FormControl>
        <Button mt={4} onClick={submitOrder}>
          Submit Order
        </Button>
      </Box>
    </Box>
  );
};

export default CreateOrder;
