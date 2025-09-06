import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProductsQuery } from "./productsApi";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductFilters from "./ProductFilters";

const ITEMS_PER_PAGE = 12;

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100000,
    inStock: false,
    sortBy: "name",
    sortOrder: "asc" as "asc" | "desc",
  });

  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery();

  const { filteredAndSortedProducts, totalPages } = useMemo(() => {
    if (!products) return { filteredAndSortedProducts: [], totalPages: 0 };

    const filtered = products.filter((product) => {
      if (filters.category && product.category !== filters.category)
        return false;
      if (product.price < filters.minPrice) return false;
      if (product.price > filters.maxPrice) return false;
      if (filters.inStock && !product.inStock) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "price":
          return filters.sortOrder === "asc"
            ? a.price - b.price
            : b.price - a.price;
        case "rating":
          return filters.sortOrder === "asc"
            ? a.rating - b.rating
            : b.rating - a.rating;
        case "name":
        default:
          return filters.sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
      }
    });

    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    return { filteredAndSortedProducts: sorted, totalPages };
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">Ошибка загрузки товаров</div>
        <p className="text-gray-600">Попробуйте обновить страницу</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Каталог товаров
        </h1>
        <p className="text-gray-600 text-lg">
          Найдено {filteredAndSortedProducts.length} товаров
        </p>
      </motion.div>

      <ProductFilters
        filters={filters}
        onFiltersChange={setFilters}
        products={products || []}
      />

      {isFetching && (
        <div className="fixed top-0 left-0 w-full h-1 bg-blue-200 z-50">
          <div className="loading-bar"></div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`page-${currentPage}-${filters.sortBy}-${filters.sortOrder}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {paginatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>

      {paginatedProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 3h6"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">Товары не найдены</p>
        </motion.div>
      )}

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center space-x-2 mt-8"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 border rounded-md transition-colors ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-2 py-2">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}

      {filteredAndSortedProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 text-sm text-gray-600"
        >
          Показаны товары {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredAndSortedProducts.length
          )}
          из {filteredAndSortedProducts.length}
        </motion.div>
      )}
    </div>
  );
};

export default ProductList;
