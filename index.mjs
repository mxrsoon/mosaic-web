import path from "path";
import fs from "fs-extra";
import url from "url";
import express from "express";

export default class MosaicWebPlatform {
	static async build(options) {
		const outPath = path.resolve(options.out);
		const appPath = path.resolve(options.app);
		const libPath = path.resolve(options.lib);
		const mosaicPath = path.resolve(options.mosaic);
		const templatePath = path.resolve(url.fileURLToPath(path.dirname(import.meta.url)), "template");
		const platformPath = path.resolve(url.fileURLToPath(path.dirname(import.meta.url)), "platform");

		await fs.emptyDir(outPath);
		await fs.copy(templatePath, outPath);

		await fs.copy(appPath, path.resolve(outPath, "app"));
		await fs.copy(libPath, path.resolve(outPath, "lib"));
		await fs.copy(mosaicPath, path.resolve(outPath, "mosaic"));

		await fs.emptyDir(path.resolve(outPath, "mosaic", "platform"));
		await fs.copy(platformPath, path.resolve(outPath, "mosaic", "platform"));

		return outPath;
	}

	static async run(options) {
		const outPath = path.resolve(options.out);
		const cliOptions = options.cliOptions;

		const port = cliOptions["port"] || 8080;

		const app = express();
		app.use("/", express.static(outPath));
		app.listen(port);
	}
}