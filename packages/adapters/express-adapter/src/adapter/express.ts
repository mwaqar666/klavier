import express, { type Express } from "express";

export class ExpressAdapter {
	private readonly _app: Express;

	public constructor() {
		this._app = express();
	}

	public get app(): Express {
		return this._app;
	}
}
