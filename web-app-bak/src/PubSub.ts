import { v4 } from 'uuid';

export class PubSub {
  private subscriptions: { [key: string]: any } = {};

  public subscribe<T>(topic: string, callback: (message: T) => void) {
    this.subscriptions[topic] = this.subscriptions[topic] || {};
    this.subscriptions[topic].callbacks =
      this.subscriptions[topic].callbacks || [];
    const id = v4();
    this.subscriptions[topic].callbacks.push({ id, callback });
    return id;
  }

  public unsubscribe(topic: string, subscriptionId: string) {
    this.subscriptions[topic] = this.subscriptions[topic] || {};
    const callbacks = this.subscriptions[topic].callbacks || [];
    const callbackIndex = callbacks.findIndex(
      (callback: any) => callback.id === subscriptionId
    );
    if (callbackIndex !== -1) {
      callbacks.splice(callbackIndex, 1);
    }
  }

  public publish<T>(topic: string, message: T) {
    this.subscriptions[topic] = this.subscriptions[topic] || {};
    const callbacks = this.subscriptions[topic].callbacks || [];
    callbacks.forEach(({ callback }: { callback: (data: T) => void }) => {
      callback(message);
    });
  }
}
