import "@testing-library/jest-dom";

// Мок для localStorage
class LocalStorageMock {
  store: Record<string, string> = {};

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock() as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Полифиллы для Fetch API
if (typeof global.Response === "undefined") {
  global.Response = class Response {} as any;
}
if (typeof global.Request === "undefined") {
  global.Request = class Request {} as any;
}
if (typeof global.Headers === "undefined") {
  global.Headers = class Headers {} as any;
}
