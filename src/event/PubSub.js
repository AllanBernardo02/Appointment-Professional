import EventEmitter from "events";
import Publisher from "./Publisher";
import Subscriber from "./Subscriber";

const emitter = new EventEmitter();

function createPublisher() {
  return new Publisher(emitter);
}

function createSubscriber() {
  emitter.removeAllListeners();
  return new Subscriber(emitter);
}

const PubSub = {
  createPublisher,
  createSubscriber,
};
export default PubSub;
