import EventEmitter from "events";

class Subscriber extends EventEmitter {
  constructor(emitter) {
    super();
    this.emitter = emitter;
    this.subscriptions = new Map();
  }

  subscribe(channel) {
    const handler = (message) => {
      this.emit("message", channel, message);
    };
    this.subscriptions.set(channel, handler);
    this.emitter.on(channel, handler);
  }

  unsubscribe(channel) {
    if (!this.subscriptions.has(channel)) {
      return;
    }
    this.emitter.removeListener(channel, this.subscriptions.get(channel));
    this.subscriptions.delete(channel);
  }
}
export default Subscriber;
