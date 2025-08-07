import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompanyData = createAsyncThunk(
  "clients/fetchCompanyData",
  async () => {
    const response = await fetch(
      "https://fe.it-academy.by/Examples/mobile_company.json"
    );
    const data = await response.json();
    return {
      companyName: data.companyName,
      clients: data.clientsArr.map((client) => ({
        id: client.id,
        name: client.im,
        surName: client.fam,
        patronymic: client.otch,
        balance: client.balance,
        status: client.balance >= 0 ? "active" : "blocked",
      })),
    };
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    companyName: "",
    clients: [],
    status: "idle",
  },
  reducers: {
    addClient: (state) => {
      const newId = Math.max(0, ...state.clients.map((c) => c.id)) + 1;
      state.clients.unshift({
        id: newId,
        name: "Новый",
        surName: "Клиент",
        patronymic: "",
        balance: 0,
        status: "blocked",
      });
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.clients[index] = action.payload;
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter((c) => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companyName = action.payload.companyName;
        state.clients = action.payload.clients;
      })
      .addCase(fetchCompanyData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addClient, updateClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;
