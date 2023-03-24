import type { IApplication } from "./contracts/application";
import type { Constructable } from "./types";
import type { IServiceProvider } from "./contracts/provider";
import { Application } from "./application";

export class Spark {
	private static spark: Spark;
	private application: IApplication;

	private constructor() {
		this.initializeApplication();
	}

	public static getInstance(): Spark {
		if (!this.spark) {
			this.spark = new Spark();
		}

		return this.spark;
	}

	public add(provider: Constructable<IServiceProvider>): void {
		this.application.registerApplicationService(provider);
	}

	private initializeApplication(): void {
		this.application = new Application();

		this.application.registerServiceContainer();
	}
}
