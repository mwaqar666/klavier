import type { IServiceProvider } from "../provider";
import type { Action, Constructable } from "@klavier/utils";
import type { IContainer } from "../container";

export interface IApplication {
	registerServiceContainer(): void;

	getServiceContainer(): IContainer;

	registerApplicationService(provider: Constructable<IServiceProvider>): void;

	bootApplicationServices(): void;

	runApplication(host: string, port: number, callback?: Action): void;
}
