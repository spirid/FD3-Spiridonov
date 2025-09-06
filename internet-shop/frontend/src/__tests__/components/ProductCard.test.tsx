import React from "react";
import { render, screen, fireEvent } from "../../utils/test-utils";
import ProductCard from "../../components/ProductCard";
import type { Product } from "../../features/products/types";
import store from "../../app/store";


const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  price: 100,
  description: "Test description",
  category: "electronics",
  image: "test.jpg",
  inStock: true,
  stockQuantity: 10,
  rating: 4.5,
  createdAt: "2023-01-01",
  updatedAt: "2023-01-01",
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
  });

  it("disables button when product is out of stock", () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);

    expect(screen.getByText("В корзину")).toBeDisabled();
  });

  it("calls addToCart when button is clicked", async () => {
    const { store } = render(<ProductCard product={mockProduct} />);

    const button = screen.getByText("В корзину");
    fireEvent.click(button);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(1);
  });
});
