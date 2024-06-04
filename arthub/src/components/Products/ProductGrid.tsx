import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { SimpleGrid, Select } from "@chakra-ui/react";
import { Product, Variant } from "../../types";
import ProductDetailsModal from "./DetailsProduct";

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedType, setSelectedType] = useState<Variant | "all">("all");
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

  const filteredProducts =
    selectedType === "all"
      ? products
      : products.filter((product) => product.variant === selectedType);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as Variant | "all");
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <Select value={selectedType} onChange={handleTypeChange}>
        <option value="all">All Types</option>
        {Object.values(Variant).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={() => handleCardClick(product)}
          />
        ))}
      </SimpleGrid>
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductGrid;
