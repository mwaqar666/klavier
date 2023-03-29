import { Inject } from "typedi";
import type { Action } from "@klavier/utils";
import { AbstractHttpAdapter } from "@klavier/core";
import type { ExpressAdapter } from "./express";
import { ExpressAdapterConst } from "../const";

export class ExpressHttpAdapter extends AbstractHttpAdapter {
	public constructor(
		// Dependencies
		@Inject(ExpressAdapterConst.ExpressAdapterToken) private readonly expressAdapter: ExpressAdapter,
	) {
		super();
	}

	public listen(host: string, port: number, callback?: Action): void {
		this.expressAdapter.app.listen(port, host, callback);
	}
}
