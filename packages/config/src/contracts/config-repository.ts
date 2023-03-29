import type { Nullable } from "@klavier/utils";
import type { ConfigMap } from "../types";

export interface IConfigRepository {
	getConfig<T, Strict = true>(key: string): Strict extends true ? Nullable<T> : T;

	setConfig(config: ConfigMap): void;

	setConfig(key: string, config: ConfigMap | string): void;
}
