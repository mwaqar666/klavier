import type { DIContainer } from "@wessberg/di";
import type { IServiceProvider } from "../../contracts/provider";

export abstract class AbstractServiceProvider implements IServiceProvider {
	protected container: DIContainer;

	public setContainer(container: DIContainer): void {
		this.container = container;
	}

	public abstract boot(): void;

	public abstract register(): void;
}
