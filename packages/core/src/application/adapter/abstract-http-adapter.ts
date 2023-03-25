import type { IHttpAdapter } from "../../contracts/adapter";
import type { Action } from "@klavier/utils";

export abstract class AbstractHttpAdapter implements IHttpAdapter {
	public abstract listen(host: string, port: number, callback?: Action): void;
}
