import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, List, ListItem, Stack } from "@chakra-ui/react";
import { OrderDetail } from "../../types";
import { getUserIdFromToken } from "../../utilis/authUtilis";

interface OrderResponse {
  orderDetail: OrderDetail;
}

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
    <Box p={5} mt={10}>
      <Heading as="h2" size="xl" mb={5}>
        Lista narudžbi
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
                Narudžba #{order.id}
              </Heading>
              <Text>Status narudžbe: {order.status}</Text>
              <Text>Ukupno: ${order.total}</Text>
              <Text>Status plaćanja: {order.paymentDetail.status}</Text>
              <Text>Metoda plaćanja: {order.paymentDetail.method}</Text>
              <Text>Iznos plaćanja: ${order.paymentDetail.amount}</Text>
              <Text>
                Broj naručenih proizvoda:
                {order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Text>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderList;
