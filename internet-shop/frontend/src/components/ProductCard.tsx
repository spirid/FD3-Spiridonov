import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
        viewBox="0 0 14 14"
      >
        <path d="M7 10.8L10.4 13c.4.2.8-.1.7-.6l-.8-3.5 2.7-2.3c.4-.3.2-.8-.3-.8h-3.3L8.1 2c-.1-.4-.7-.4-.8 0L5.8 5.8H2.5c-.5 0-.7.5-.3.8l2.7 2.3-.8 3.5c-.1.5.3.8.7.6L7 10.8z" />
      </svg>
    ));
  };

  return (
    <Link to={`/products/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="product-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        {/* Бейдж категории */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Изображение товара */}
        <div className="relative overflow-hidden h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors" />

          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Нет в наличии
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <div className="rating-stars flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.rating})
              </span>
            </div>

            <span className="text-lg font-bold text-blue-600">
              ${product.price}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs ${
                product.stockQuantity > 10
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              {product.stockQuantity} шт.
            </span>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 text-xs"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4 4V2a2 2 0 114 0v2h2a1 1 0 011 1v5a2 2 0 01-2 2H3a2 2 0 01-2-2V5a1 1 0 011-1h2zm2-1a1 1 0 00-1 1v2h2V4a1 1 0 00-1-1z" />
              </svg>
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
