import { AbstractServiceProvider } from "@klavier/core";
import type { IConfigLoader, IConfigRepository } from "../contracts";
import type { ConfigRepository } from "../services";
import type { ConfigLoader } from "../services/config-loader";

export class ConfigServiceProvider extends AbstractServiceProvider {
	public register(): void {
		this.container.registerSingleton<IConfigLoader, ConfigLoader>();
		this.container.registerSingleton<IConfigRepository, ConfigRepository>();
	}

	public boot(): void {
		const configLoader = this.container.get<IConfigLoader>();
		const configRepository = this.container.get<IConfigRepository>();

		configLoader.useRepository(configRepository);
	}
}
