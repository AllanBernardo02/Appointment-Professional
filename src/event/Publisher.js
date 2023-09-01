class Publisher {
  constructor(emitter) {
    this.emitter = emitter;
  }

  publish(channel, message) {
    this.emitter.emit(channel, message);
  }
}

export default Publisher;
