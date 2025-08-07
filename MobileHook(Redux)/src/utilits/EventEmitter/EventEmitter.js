class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;

    const index = this.events[event].indexOf(listener);
    if (index !== -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export const emitter = new EventEmitter();
