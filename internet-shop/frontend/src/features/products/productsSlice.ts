import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
}

interface ProductsState {
  items: any[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    minPrice: 0,
    maxPrice: 100000,
    inStock: false,
  },
  sortBy: "name",
  sortOrder: "asc",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { setFilters, setSort } = productsSlice.actions;
export default productsSlice.reducer;
