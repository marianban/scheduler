import { PubSub } from './PubSub';

describe('PubSub', () => {
  it('can publish without subscribers', () => {
    const pubSub = new PubSub();
    pubSub.publish<string>('test', 'test');
  });

  it('subscribers receive published messages', () => {
    const pubSub = new PubSub();
    expect.assertions(2);
    pubSub.subscribe<string>('test', data => {
      expect(data).toBe('test');
    });
    pubSub.subscribe<string>('test', data => {
      expect(data).toBe('test');
    });
    pubSub.publish<string>('test', 'test');
  });

  it('can unsubscribe subscribers', () => {
    const pubSub = new PubSub();
    expect.assertions(1);
    pubSub.subscribe<string>('test', data => {
      expect(data).toBe('test');
    });
    const subscriptionId = pubSub.subscribe<string>('test', data => {
      expect(data).toBe('test');
    });
    pubSub.unsubscribe('test', subscriptionId);
    pubSub.publish<string>('test', 'test');
  });
});
