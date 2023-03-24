import type { IApplication } from "../contracts/application";
import type { IServiceProvider } from "../contracts/provider";
import type { Constructable } from "../types";
import { DIContainer } from "@wessberg/di";

export class Application implements IApplication {
	private container: DIContainer;
	private applicationProviders: Array<IServiceProvider> = [];

	public registerServiceContainer(): void {
		this.container = new DIContainer();
	}

	public registerApplicationService(provider: Constructable<IServiceProvider>): void {
		const providerInstance = new provider();

		providerInstance.setContainer(this.container);
		providerInstance.register();

		this.applicationProviders.push(providerInstance);
	}

	public bootApplicationService(): void {
		this.applicationProviders.map((provider: IServiceProvider) => {
			provider.boot();
		});
	}
}
