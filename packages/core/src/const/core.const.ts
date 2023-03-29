import { Token } from "typedi";
import type { IHttpAdapter } from "../contracts/adapter";

export class CoreConst {
	public static IHttpAdapterToken: Token<IHttpAdapter> = new Token<IHttpAdapter>("IHttpAdapterToken");
}
