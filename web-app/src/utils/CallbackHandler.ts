export type UnsubscribeCallback = () => void;

export class CallbackHandler<T> {
  private callbacks: Array<(item: Readonly<T>) => void> = [];

  public add(callback: (item: Readonly<T>) => void): UnsubscribeCallback {
    this.callbacks.push(callback);
    const unsubscribe = () => {
      const index = this.callbacks.indexOf(callback);
      if (index !== -1) {
        this.callbacks.splice(index, 1);
      }
    };
    return unsubscribe;
  }

  public handle(item: T) {
    this.callbacks.forEach(callback => {
      callback(item);
    });
  }
}
