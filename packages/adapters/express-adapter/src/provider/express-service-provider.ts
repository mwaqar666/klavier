import { AbstractServiceProvider, type IHttpAdapter } from "@klavier/core";
import type { ExpressHttpAdapter } from "../adapter";

export class ExpressServiceProvider extends AbstractServiceProvider {
	public register(): void {
		this.container.registerSingleton<IHttpAdapter, ExpressHttpAdapter>();
	}

	public boot(): void {
		//
	}
}
