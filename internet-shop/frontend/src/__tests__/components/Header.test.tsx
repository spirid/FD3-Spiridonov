import React from "react";
import { render, screen, fireEvent } from "../../utils/test-utils";
import Header from "../../components/Header";

describe("Header", () => {
  const mockOnCartClick = jest.fn();

  beforeEach(() => {
    mockOnCartClick.mockClear();
  });

  it("renders header with cart button", () => {
    render(<Header onCartClick={mockOnCartClick} />);

    expect(screen.getByText("EliteStore")).toBeInTheDocument();
    expect(screen.getByText("Корзина")).toBeInTheDocument();
  });

  it("calls onCartClick when cart button is clicked", () => {
    render(<Header onCartClick={mockOnCartClick} />);

    const cartButton = screen.getByText("Корзина");
    fireEvent.click(cartButton);

    expect(mockOnCartClick).toHaveBeenCalled();
  });

  it("shows cart item count when items are present", () => {
    const { store } = render(<Header onCartClick={mockOnCartClick} />);

    store.dispatch({
      type: "cart/addToCart",
      payload: { id: 1, name: "Test", price: 100, image: "test.jpg" },
    });

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
