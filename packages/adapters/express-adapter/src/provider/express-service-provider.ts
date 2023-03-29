import { AbstractServiceProvider, CoreConst } from "@klavier/core";
import { ExpressAdapterConst } from "../const";
import { ExpressAdapter, ExpressHttpAdapter } from "../adapter";

export class ExpressServiceProvider extends AbstractServiceProvider {
	public register(): void {
		this.container.set(CoreConst.IHttpAdapterToken, { type: ExpressHttpAdapter });
		this.container.set(ExpressAdapterConst.ExpressAdapterToken, { type: ExpressAdapter });
	}

	public boot(): void {
		//
	}
}
