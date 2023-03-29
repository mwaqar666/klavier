import type { IApplication } from "./contracts/application";
import type { IServiceProvider } from "./contracts/provider";
import type { Action, Constructable } from "@klavier/utils";
import { Application } from "./application";

export class Klavier {
	private static klavier: Klavier;

	private constructor() {
		this.initializeApplication();
	}

	private _application: IApplication;

	public get application(): IApplication {
		return this._application;
	}

	public set application(value: IApplication) {
		this._application = value;
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

	public run(host: string, port: number, callback?: Action): void {
		this.application.runApplication(host, port, callback);
	}

	private initializeApplication(): void {
		this.application = new Application();

		this.application.registerServiceContainer();
	}
}
