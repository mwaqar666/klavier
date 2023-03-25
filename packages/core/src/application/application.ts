import { DIContainer } from "@wessberg/di";
import type { IApplication } from "../contracts/application";
import type { IServiceProvider } from "../contracts/provider";
import type { Action, Constructable } from "@klavier/utils";
import type { IHttpAdapter } from "../contracts/adapter";

export class Application implements IApplication {
	private container: DIContainer;
	private applicationProviders: Array<IServiceProvider> = [];

	public registerServiceContainer(): void {
		this.container = new DIContainer();
	}

	public registerApplicationService(provider: Constructable<IServiceProvider>): void {
		const providerInstance = this.runProviderRegisterCycle(provider);

		this.applicationProviders.push(providerInstance);
	}

	public bootApplication(host: string, port: number, callback?: Action): void {
		this.runRegisteredProvidersBootCycle();

		this.listenForIncomingConnections(host, port, callback);
	}

	private runProviderRegisterCycle(provider: Constructable<IServiceProvider>): IServiceProvider {
		const providerInstance = new provider();

		providerInstance.setContainer(this.container);
		providerInstance.register();

		return providerInstance;
	}

	private runRegisteredProvidersBootCycle(): void {
		this.applicationProviders.forEach((provider: IServiceProvider) => provider.boot());
	}

	private listenForIncomingConnections(host: string, port: number, callback?: Action): void {
		const httpAdapter = this.container.get<IHttpAdapter>();
		if (!httpAdapter) throw new Error("No Http adapter configured to run the application");

		httpAdapter.listen(host, port, callback);
	}
}
