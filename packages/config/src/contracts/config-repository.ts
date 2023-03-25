import type { Nullable } from "@klavier/utils";
import { ConfigMap } from "../types";

export interface IConfigRepository {
	getConfig<T>(key: string): Nullable<T>;

	setConfig(config: ConfigMap): void;

	setConfig(key: string, config: ConfigMap | string): void;
}
