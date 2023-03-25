import type { IServiceProvider } from "../provider";
import type { Action, Constructable } from "@klavier/utils";

export interface IApplication {
	registerServiceContainer(): void;

	registerApplicationService(provider: Constructable<IServiceProvider>): void;

	bootApplication(host: string, port: number, callback?: Action): void;
}
