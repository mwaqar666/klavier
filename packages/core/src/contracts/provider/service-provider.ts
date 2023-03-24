import type { DIContainer } from "@wessberg/di";

export interface IServiceProvider {
	setContainer(container: DIContainer): void;

	register(): void;

	boot(): void;
}
