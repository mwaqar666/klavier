export type Key<T> = keyof T;

export type Optional<T> = undefined | T;

export type Nullable<T> = null | T;

export type Delegate<TArgs extends Array<unknown> = Array<unknown>, TReturn = unknown> = (...args: TArgs) => TReturn;

export type Action<TArgs extends Array<unknown> = Array<unknown>> = Delegate<TArgs, void>;

export type Constructable<T, TArgs extends Array<unknown> = Array<unknown>> = new (...args: TArgs) => T;

export type PartialOnly<T, K extends Key<T>> = Partial<Pick<T, K>> & Omit<T, K>;

export type Without<T, R> = { [K in Exclude<Key<T>, Key<R>>]?: never };

export type SingleExclusiveUnion<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type ExclusiveUnion<T extends Array<unknown>> = T extends [infer Only] ? Only : T extends [infer First, infer Second, ...infer Rest] ? ExclusiveUnion<[SingleExclusiveUnion<First, Second>, ...Rest]> : never;
