import type { Nullable } from "@klavier/utils";

export type ConfigMap = {
	[key: string]: Nullable<ConfigMap | string>;
};
