import { Token } from "typedi";
import type { IConfigLoader, IConfigRepository } from "../contracts";

export class ConfigConst {
	public static IConfigLoaderToken: Token<IConfigLoader> = new Token<IConfigLoader>("IConfigLoaderToken");
	public static IConfigRepositoryToken: Token<IConfigRepository> = new Token<IConfigRepository>("IConfigRepositoryToken");
}
