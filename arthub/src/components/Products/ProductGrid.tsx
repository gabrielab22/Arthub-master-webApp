import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "../../types";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
