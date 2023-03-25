import type { IServiceProvider } from "../provider";
import type { Constructable } from "@klavier/utils";

export interface IApplication {
	registerServiceContainer(): void;

	registerApplicationService(provider: Constructable<IServiceProvider>): void;

	bootApplication(): void;
}
