import { Container as TypeDIContainer, type Token } from "typedi";
import type { DependencyProvider } from "@klavier/utils";
import type { IContainer } from "../../contracts/container";

export class Container implements IContainer {
	public get<T>(token: Token<T>): T {
		return TypeDIContainer.get(token);
	}

	public set<T>(token: Token<T>, provider: DependencyProvider<T>): void {
		TypeDIContainer.set({ id: token, ...provider });
	}
}
