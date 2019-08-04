export const someOrEmptyString = (value: string | null | undefined) =>
  value ? value : '';

export const callCallbacks = <T>(
  callbacks: Array<(item: Readonly<T>) => void>,
  item: T
) => {
  callbacks.forEach(callback => {
    callback(item);
  });
};
