import type { IServiceProvider } from "../../contracts/provider";
import type { DIContainer } from "@wessberg/di";

export abstract class AbstractServiceProvider implements IServiceProvider {
	protected container: DIContainer;

	public setContainer(container: DIContainer): void {
		this.container = container;
	}

	public abstract boot(): void;

	public abstract register(): void;
}
