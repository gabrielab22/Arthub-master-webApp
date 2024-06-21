import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import {
  Box,
  Flex,
  Select,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Product, Variant } from "../../types";
import ProductDetailsModal from "./DetailsProduct";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<Variant | "all">("all");
  const [selectedArtist, setSelectedArtist] = useState<string | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Product[]>("/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchType =
      selectedType === "all" || product.variant === selectedType;
    const matchArtist =
      selectedArtist === "all" || product.artist === selectedArtist;
    return matchType && matchArtist;
  });

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as Variant | "all");
  };

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtist(event.target.value);
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // Get unique artists from products
  const artists = Array.from(
    new Set(products.map((product) => product.artist))
  );

  return (
    <Box className="top-box" p={{ base: 4, md: 8 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={4}
        justify="center"
        align="center"
      >
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          mb={{ base: 4, md: 0 }}
          maxW={{ base: "100%", md: "50%", lg: "25%" }}
          mx="auto"
        >
          <option value="all">All Types</option>
          {Object.values(Variant).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          value={selectedArtist}
          onChange={handleArtistChange}
          maxW={{ base: "100%", md: "50%", lg: "25%" }}
          mx="auto"
        >
          <option value="all">All Artists</option>
          {artists.map((artist, index) => (
            <option key={index} value={artist}>
              {artist}
            </option>
          ))}
        </Select>
      </Flex>
      {filteredProducts.length > 0 ? (
        <SimpleGrid columns={columns} spacing={4}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={() => handleCardClick(product)}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center" mt={8}>
          No products available, please try again later.
        </Text>
      )}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};

export default ProductGrid;
