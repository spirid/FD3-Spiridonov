import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Test Product",
        price: 100,
        // остальные поля
      },
    ]);
  }),
];

export const server = setupServer(...handlers);
