import { productsApi } from "../../../features/products/productsApi";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../../features/cart/cartSlice";

const createTestStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productsApi.middleware),
  });

describe("productsApi", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  it("should handle getProducts query", () => {
    // Просто проверяем что endpoint существует
    expect(productsApi.endpoints.getProducts).toBeDefined();
  });

  it("should handle getProduct query", () => {
    // Просто проверяем что endpoint существует
    expect(productsApi.endpoints.getProduct).toBeDefined();
  });
});
