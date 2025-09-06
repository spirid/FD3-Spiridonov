import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem,
} from "../../../features/cart/cartSlice";

describe("cart slice", () => {
  const mockItem: Omit<CartItem, "quantity"> = {
    id: 1,
    name: "Test Product",
    price: 100,
    image: "test.jpg",
  };

  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      items: [],
      isOpen: false,
      lastAdded: null,
    });
  });

  it("should add item to cart", () => {
    const state = cartReducer(undefined, addToCart(mockItem));
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...mockItem, quantity: 1 });
  });

  it("should increment quantity when adding existing item", () => {
    let state = cartReducer(undefined, addToCart(mockItem));
    state = cartReducer(state, addToCart(mockItem));

    expect(state.items[0].quantity).toBe(2);
  });

  it("should remove item from cart", () => {
    let state = cartReducer(undefined, addToCart(mockItem));
    state = cartReducer(state, removeFromCart(1));

    expect(state.items).toHaveLength(0);
  });

  it("should update quantity", () => {
    let state = cartReducer(undefined, addToCart(mockItem));
    state = cartReducer(state, updateQuantity({ id: 1, quantity: 5 }));

    expect(state.items[0].quantity).toBe(5);
  });

  it("should remove item when quantity is 0", () => {
    let state = cartReducer(undefined, addToCart(mockItem));
    state = cartReducer(state, updateQuantity({ id: 1, quantity: 0 }));

    expect(state.items).toHaveLength(0);
  });

  it("should clear cart", () => {
    let state = cartReducer(undefined, addToCart(mockItem));
    state = cartReducer(state, addToCart({ ...mockItem, id: 2 }));
    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });
});
