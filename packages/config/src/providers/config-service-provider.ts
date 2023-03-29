import { AbstractServiceProvider } from "@klavier/core";
import { ConfigConst } from "../const";
import { ConfigLoader, ConfigRepository } from "../services";
import type { IConfigLoader, IConfigRepository } from "../contracts";

export class ConfigServiceProvider extends AbstractServiceProvider {
	public register(): void {
		this.container.set(ConfigConst.IConfigLoaderToken, { type: ConfigLoader });
		this.container.set(ConfigConst.IConfigRepositoryToken, { type: ConfigRepository });
	}

	public boot(): void {
		const configLoader: IConfigLoader = this.container.get(ConfigConst.IConfigLoaderToken);
		const configRepository: IConfigRepository = this.container.get(ConfigConst.IConfigRepositoryToken);

		configLoader.useRepository(configRepository);
	}
}
