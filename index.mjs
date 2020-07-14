import path from "path";
import fs from "fs-extra";
import url from "url";

export default class MosaicWebPlatform {
	static async build(options) {
		const outPath = path.resolve(options.out);
		const appPath = path.resolve(options.app);
		const libPath = path.resolve(options.lib);
		const mosaicPath = path.resolve(options.mosaic);
		const templatePath = path.resolve(url.fileURLToPath(path.dirname(import.meta.url)), "template");

		await fs.emptyDir(outPath);
		await fs.copy(path.resolve(templatePath, "platform"), path.resolve(outPath, "platform"));
		await fs.copy(path.resolve(templatePath, "index.html"), path.resolve(outPath, "index.html"));
		await fs.copy(path.resolve(templatePath, "jsconfig.json"), path.resolve(outPath, "jsconfig.json"));
		await fs.copy(appPath, path.resolve(outPath, "app"));
		await fs.copy(libPath, path.resolve(outPath, "lib"));
		await fs.copy(mosaicPath, path.resolve(outPath, "mosaic"));

		return outPath;
	}
}