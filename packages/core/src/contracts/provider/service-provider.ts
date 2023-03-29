import type { IContainer } from "../container";

export interface IServiceProvider {
	setContainer(container: IContainer): void;

	register(): void;

	boot(): void;
}
