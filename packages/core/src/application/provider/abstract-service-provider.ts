import type { IServiceProvider } from "../../contracts/provider";
import type { IContainer } from "../../contracts/container";

export abstract class AbstractServiceProvider implements IServiceProvider {
	protected container: IContainer;

	public setContainer(container: IContainer): void {
		this.container = container;
	}

	public abstract boot(): void;

	public abstract register(): void;
}
