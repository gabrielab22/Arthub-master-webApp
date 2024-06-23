import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto"; // Automatically register necessary chart components

interface ChartData {
  artist: string;
  sales: number;
}

const TopSellingArtists: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  const fetchTopSellingArtists = async () => {
    try {
      const response = await axios.get("orders/top-selling-artists", {
        params: { startDate, endDate },
      });

      const data: ChartData[] = response.data;
      setChartData(data);
    } catch (error) {
      console.error("Error fetching top selling artists:", error);
    }
  };

  return (
    <Box p={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        justify="center"
        maxW="600px"
        mx="auto"
        gap={4}
      >
        <FormControl id="start-date">
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="end-date">
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={fetchTopSellingArtists}
          colorScheme="teal"
          fontSize="sm"
          px={4}
          py={2}
        >
          Fetch Artists
        </Button>
      </Flex>
      {chartData && (
        <Box mt={5} maxW="100%" overflowX="auto">
          <Box width="1000px" height="500px">
            <Bar
              data={{
                labels: chartData.map((item) => item.artist),
                datasets: [
                  {
                    label: "Sales",
                    data: chartData.map((item) => item.sales),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TopSellingArtists;
