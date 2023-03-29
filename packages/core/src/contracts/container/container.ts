import { Token } from "typedi";
import type { DependencyProvider } from "@klavier/utils";

export interface IContainer {
	get<T>(token: Token<T>): T;

	set<T>(token: Token<T>, provider: DependencyProvider<T>): void;
}
