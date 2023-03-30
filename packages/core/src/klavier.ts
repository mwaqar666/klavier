import type { IApplication } from "./contracts/application";
import type { IServiceProvider } from "./contracts/provider";
import type { Action, Constructable } from "@klavier/utils";
import type { IContainer } from "./contracts/container";
import { Application } from "./application";

export class Klavier {
	private static klavier: Klavier;
	private application: IApplication;

	private constructor() {
		this.initializeApplication();
	}

	public static getInstance(): Klavier {
		if (!this.klavier) {
			this.klavier = new Klavier();
		}

		return this.klavier;
	}

	public add(provider: Constructable<IServiceProvider>): Klavier {
		this.application.registerApplicationService(provider);

		return this;
	}

	public boot(): Klavier {
		this.application.bootApplicationServices();

		return this;
	}

	public serviceContainer(): IContainer {
		return this.application.getServiceContainer();
	}

	public run(host: string, port: number, callback?: Action): void {
		this.application.runApplication(host, port, callback);
	}

	private initializeApplication(): void {
		this.application = new Application();

		this.application.registerServiceContainer();
	}
}
