import type { Action, Constructable } from "@klavier/utils";
import type { IApplication } from "../contracts/application";
import type { IServiceProvider } from "../contracts/provider";
import type { IContainer } from "../contracts/container";
import type { IHttpAdapter } from "../contracts/adapter";
import { Container } from "./container";
import { CoreConst } from "../const";

export class Application implements IApplication {
	private booted: boolean;
	private container: IContainer;
	private applicationProviders: Array<IServiceProvider> = [];

	public registerServiceContainer(): void {
		this.container = new Container();
	}

	public getServiceContainer(): IContainer {
		return this.container;
	}

	public registerApplicationService(provider: Constructable<IServiceProvider>): void {
		if (!this.container) {
			throw new Error("No service container registered to add the provider!");
		}

		const providerInstance: IServiceProvider = this.runProviderRegisterCycle(provider);

		this.applicationProviders.push(providerInstance);
	}

	public bootApplicationServices(): void {
		if (this.booted) {
			throw new Error("Application already booted!");
		}

		this.runRegisteredProvidersBootCycle();

		this.booted = true;
	}

	public runApplication(host: string, port: number, callback?: Action): void {
		if (!this.booted) {
			throw new Error("Application not booted yet! Call the bootApplicationServices hook to initialize the boot cycle.");
		}

		this.listenForIncomingConnections(host, port, callback);
	}

	private runProviderRegisterCycle(provider: Constructable<IServiceProvider>): IServiceProvider {
		const providerInstance: IServiceProvider = new provider();

		providerInstance.setContainer(this.container);
		providerInstance.register();

		return providerInstance;
	}

	private runRegisteredProvidersBootCycle(): void {
		this.applicationProviders.forEach((provider: IServiceProvider) => provider.boot());
	}

	private listenForIncomingConnections(host: string, port: number, callback?: Action): void {
		const httpAdapter: IHttpAdapter = this.container.get(CoreConst.IHttpAdapterToken);
		if (!httpAdapter) throw new Error("No Http adapter configured to run the application");

		httpAdapter.listen(host, port, callback);
	}
}
