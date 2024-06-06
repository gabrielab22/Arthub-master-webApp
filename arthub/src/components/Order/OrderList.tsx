import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, List, ListItem, Stack } from "@chakra-ui/react";
import { OrderDetail, OrderResponse } from "../../types";
import { getUserIdFromToken } from "../../utilis/authUtilis";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderResponse[]>(`orders/${userId}`);
        const orderDetails = response.data.map((order) => order.orderDetail);
        setOrders(orderDetails);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={5}>
        Order History
      </Heading>
      <List spacing={5}>
        {orders.map((order) => (
          <ListItem
            key={order.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Stack spacing={3}>
              <Heading as="h3" size="md">
                Order #{order.id}
              </Heading>
              <Text>Order Status: {order.status}</Text>
              <Text>Total: ${order.total}</Text>
              <Text>Payment Status: {order.paymentDetail.status}</Text>
              <Text>Payment Method: {order.paymentDetail.method}</Text>
              <Text>Payment Amount: ${order.paymentDetail.amount}</Text>
              <Text>
                Number of Products Ordered:{" "}
                {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
              <Text>
                Order Created At:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderList;
