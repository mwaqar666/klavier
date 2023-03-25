import type { IConfigRepository } from "@klavier/config";

export interface IConfigLoader {
	useRepository(repository: IConfigRepository): void;

	loadConfig(absoluteFilePath: string): void;
}
