export type Constructable<T, TArgs extends Array<unknown> = Array<unknown>> = new (...args: TArgs) => T;
