import { Token } from "typedi";
import type { ExpressAdapter } from "../adapter";

export class ExpressAdapterConst {
	public static ExpressAdapterToken: Token<ExpressAdapter> = new Token<ExpressAdapter>("ExpressAdapterToken");
}
