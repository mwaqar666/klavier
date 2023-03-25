import type { IApplication } from "./contracts/application";
import type { IServiceProvider } from "./contracts/provider";
import type { Constructable } from "@klavier/utils";
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

	public add(provider: Constructable<IServiceProvider>): void {
		this.application.registerApplicationService(provider);
	}

	public run(): void {
		this.application.bootApplication();
	}

	private initializeApplication(): void {
		this.application = new Application();

		this.application.registerServiceContainer();
	}
}
