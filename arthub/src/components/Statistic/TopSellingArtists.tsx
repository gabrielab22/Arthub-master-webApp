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
      <Flex direction="column" align="center" maxW="400px" mx="auto">
        <FormControl id="start-date" mb={4}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="end-date" mb={4}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormControl>
        <Button onClick={fetchTopSellingArtists} colorScheme="teal" mb={5}>
          Fetch Top Selling Artists
        </Button>
      </Flex>
      {chartData && (
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
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default TopSellingArtists;
