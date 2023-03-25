import { AbstractHttpAdapter } from "@klavier/core";
import type { Action } from "@klavier/utils";
import type { ExpressAdapter } from "./express";

export class ExpressHttpAdapter extends AbstractHttpAdapter {
	public constructor(private readonly expressAdapter: ExpressAdapter) {
		super();
	}

	public listen(host: string, port: number, callback?: Action): void {
		this.expressAdapter.app.listen(port, host, callback);
	}
}
