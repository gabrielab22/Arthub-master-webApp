import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Stack,
  Select,
  Flex,
} from "@chakra-ui/react";
import { OrderDetail, OrderResponse } from "../../types";
import { getUserIdFromToken } from "../../utilis/authUtilis";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

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
  }, [userId]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
    setSelectedMonth("");
    setSelectedDay("");
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    setSelectedDay("");
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const orderYear = orderDate.getFullYear().toString();
    const orderMonth = (orderDate.getMonth() + 1).toString().padStart(2, "0");
    const orderDay = orderDate.getDate().toString().padStart(2, "0");

    return (
      (!selectedYear || orderYear === selectedYear) &&
      (!selectedMonth || orderMonth === selectedMonth) &&
      (!selectedDay || orderDay === selectedDay)
    );
  });

  const uniqueYears = Array.from(
    new Set(
      orders.map((order) => new Date(order.createdAt).getFullYear().toString())
    )
  );

  const currentYear = new Date().getFullYear();
  const allYears = Array.from({ length: 5 }, (_, i) =>
    (currentYear - 2 + i).toString()
  );

  const allMonths = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const allDays =
    selectedYear && selectedMonth
      ? Array.from(
          {
            length: daysInMonth(
              parseInt(selectedYear),
              parseInt(selectedMonth)
            ),
          },
          (_, i) => (i + 1).toString().padStart(2, "0")
        )
      : [];

  return (
    <Box p={5}>
      <Heading as="h2" size="xl" mb={5}>
        Order History
      </Heading>
      <Flex mb={5} alignItems="center">
        <Text mr={3}>Year:</Text>
        <Select
          placeholder="Select year"
          mr={3}
          onChange={handleYearChange}
          value={selectedYear}
        >
          <option value="">All Years</option>
          {allYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Text mr={3}>Month:</Text>
        <Select
          placeholder="Select month"
          mr={3}
          onChange={handleMonthChange}
          value={selectedMonth}
          disabled={!selectedYear}
        >
          <option value="">All Months</option>
          {allMonths.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </Select>
        <Text mr={3}>Day:</Text>
        <Select
          placeholder="Select day"
          onChange={handleDayChange}
          value={selectedDay}
          disabled={!selectedMonth}
        >
          <option value="">All Days</option>
          {allDays.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </Flex>
      <List spacing={5}>
        {filteredOrders.map((order) => (
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
