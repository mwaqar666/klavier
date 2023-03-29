import type { Container, ServiceMetadata } from "typedi";
import type { Constructable, ExclusiveUnion, PartialOnly } from "./common";

export type TContainer = Constructable<Container> & typeof Container;

export interface IServiceMetaData<T> extends Omit<ServiceMetadata<T>, "id" | "eager" | "global" | "multiple"> {
	value: T;
}

export type ValueProvider<T> = Omit<PartialOnly<IServiceMetaData<T>, "transient">, "type" | "factory">;
export type ClassProvider<T> = Omit<PartialOnly<IServiceMetaData<T>, "transient">, "value" | "factory">;
export type FactoryProvider<T> = Omit<PartialOnly<IServiceMetaData<T>, "transient">, "type" | "value">;

export type DependencyProvider<T> = ExclusiveUnion<[ValueProvider<T>, ClassProvider<T>, FactoryProvider<T>]>;
