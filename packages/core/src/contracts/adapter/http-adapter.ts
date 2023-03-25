import type { Action } from "@klavier/utils";

export interface IHttpAdapter {
	listen(host: string, port: number, callback?: Action): void;
}
