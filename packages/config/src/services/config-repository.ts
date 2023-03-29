import type { IConfigRepository } from "@klavier/config";
import type { ConfigMap } from "../types";
import type { Nullable } from "@klavier/utils";

export class ConfigRepository implements IConfigRepository {
	private config: ConfigMap = {};

	public getConfig<T, Strict = true>(key: string): Strict extends true ? Nullable<T> : T {
		return this.extractConfig<T>(key) as Strict extends true ? Nullable<T> : T;
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
		const configKeyPath: Array<string> = this.prepareKeyPath(dotSeparatedKeyPath);

		return configKeyPath.reduce((reducedConfig: Nullable<ConfigMap | string>, currentKey: string): Nullable<ConfigMap | string> => {
			if (!reducedConfig || typeof reducedConfig === "string") return null;

			const configKeyPath: Nullable<ConfigMap | string> = reducedConfig[currentKey];
			return configKeyPath !== undefined ? configKeyPath : null;
		}, this.config) as Nullable<T>;
	}

	private persistConfig(dotSeparatedKeyPath: string, config: ConfigMap | string): void {
		const configKeyPath: Array<string> = this.prepareKeyPath(dotSeparatedKeyPath);
		const configKeyPathSteps: number = configKeyPath.length;

		configKeyPath.reduce((reducedConfig: ConfigMap, currentKey: string, currentIndex: number): ConfigMap => {
			let configPathObject: Nullable<ConfigMap | string> = reducedConfig[currentKey];
			const isLastIndex: boolean = configKeyPathSteps - 1 === currentIndex;

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
