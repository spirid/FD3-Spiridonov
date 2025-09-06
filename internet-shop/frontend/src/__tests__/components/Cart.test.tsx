import React from "react";
import { render, screen, fireEvent } from "../../utils/test-utils";
import Cart from "../../components/Cart";
import { addToCart } from "../../features/cart/cartSlice";

describe("Cart", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders empty cart message when no items", () => {
    render(<Cart isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  it("renders cart items when cart is not empty", () => {
    const { store } = render(<Cart isOpen={true} onClose={mockOnClose} />);

    store.dispatch(
      addToCart({
        id: 1,
        name: "Test Product",
        price: 100,
        image: "test.jpg",
      })
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    render(<Cart isOpen={true} onClose={mockOnClose} />);

    const overlay = screen.getByRole("presentation");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("removes item when delete button is clicked", () => {
    const { store } = render(<Cart isOpen={true} onClose={mockOnClose} />);

    store.dispatch(
      addToCart({
        id: 1,
        name: "Test Product",
        price: 100,
        image: "test.jpg",
      })
    );

    const deleteButton = screen.getByLabelText("Удалить товар");
    fireEvent.click(deleteButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(0);
  });
});
