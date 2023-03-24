import type { Constructable } from "../../types";
import type { IServiceProvider } from "../provider";

export interface IApplication {
	registerServiceContainer(): void;

	registerApplicationService(provider: Constructable<IServiceProvider>): void;

	bootApplicationService(): void;
}
