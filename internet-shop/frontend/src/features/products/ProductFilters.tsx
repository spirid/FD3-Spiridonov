import React from "react";
import { motion } from "framer-motion";
import type { Product } from "./types";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  products: Product[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  products,
}) => {
  const categories = [...new Set(products.map((p) => p.category))];

  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена: ${filters.minPrice} - ${filters.maxPrice}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100000"
              step="100"
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", Number(e.target.value))
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange("inStock", e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Только в наличии
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сортировка
          </label>
          <div className="flex space-x-2">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">По названию</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </select>
            <button
              onClick={() =>
                handleFilterChange(
                  "sortOrder",
                  filters.sortOrder === "asc" ? "desc" : "asc"
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {filters.sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.category && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Категория: {filters.category}
            <button
              onClick={() => handleFilterChange("category", "")}
              className="ml-1 hover:text-blue-600"
            >
              ×
            </button>
          </span>
        )}
        {filters.inStock && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            В наличии
            <button
              onClick={() => handleFilterChange("inStock", false)}
              className="ml-1 hover:text-green-600"
            >
              ×
            </button>
          </span>
        )}
        {(filters.minPrice > 0 || filters.maxPrice < 100000) && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Цена: ${filters.minPrice}-${filters.maxPrice}
            <button
              onClick={() => {
                handleFilterChange("minPrice", 0);
                handleFilterChange("maxPrice", 100000);
              }}
              className="ml-1 hover:text-purple-600"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductFilters;
