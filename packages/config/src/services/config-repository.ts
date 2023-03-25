import type { IConfigRepository } from "@klavier/config";
import type { ConfigMap } from "../types";
import type { Nullable } from "@klavier/utils";

export class ConfigRepository implements IConfigRepository {
	private config: ConfigMap = {};

	public getConfig<T = string>(key: string): Nullable<T> {
		return this.extractConfig<T>(key);
	}

	public setConfig(config: ConfigMap): void;
	public setConfig(key: string, config: ConfigMap | string): void;
	public setConfig(key: ConfigMap | string, config?: ConfigMap | string): void {
		if (this.isRootConfig(key)) {
			this.config = key;

			return;
		}

		this.persistConfig(key, config as ConfigMap | string);
	}

	private extractConfig<T>(dotSeparatedKeyPath: string): Nullable<T> {
		const configKeyPath = this.prepareKeyPath(dotSeparatedKeyPath);

		return configKeyPath.reduce((reducedConfig: Nullable<ConfigMap | string>, currentKey: string) => {
			if (!reducedConfig || typeof reducedConfig === "string") return null;

			const configKeyPath = reducedConfig[currentKey];
			return configKeyPath !== undefined ? configKeyPath : null;
		}, this.config) as Nullable<T>;
	}

	private persistConfig(dotSeparatedKeyPath: string, config: ConfigMap | string): void {
		const configKeyPath = this.prepareKeyPath(dotSeparatedKeyPath);
		const configKeyPathSteps = configKeyPath.length;

		configKeyPath.reduce((reducedConfig: ConfigMap, currentKey: string, currentIndex: number) => {
			let configPathObject = reducedConfig[currentKey];
			const isLastIndex = configKeyPathSteps - 1 === currentIndex;

			if (!configPathObject || typeof configPathObject === "string" || isLastIndex) {
				const newConfigObject: ConfigMap = isLastIndex ? (config as ConfigMap) : {};
				reducedConfig[currentKey] = newConfigObject;

				configPathObject = newConfigObject;
			}

			return configPathObject;
		}, this.config);
	}

	private prepareKeyPath(dotSeparatedKeyPath: string): Array<string> {
		return dotSeparatedKeyPath.split(".");
	}

	private isRootConfig(key: ConfigMap | string): key is ConfigMap {
		return typeof key !== "string";
	}
}
