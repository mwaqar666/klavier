import { readFileSync } from "fs";
import { load as loadYamlEnvironment } from "js-yaml";
import type { IConfigLoader, IConfigRepository } from "@klavier/config";
import type { ConfigMap } from "../types";

export class ConfigLoader implements IConfigLoader {
	private configRepository: IConfigRepository;

	public useRepository(repository: IConfigRepository): void {
		this.configRepository = repository;
	}

	public loadConfig(absoluteFilePath: string): void {
		const fileStringContents = readFileSync(absoluteFilePath, "utf8");

		try {
			const yamlEnvironment = loadYamlEnvironment(fileStringContents) as ConfigMap;

			this.configRepository.setConfig(yamlEnvironment);
		} catch (e) {
			console.log(e);
		}
	}
}
