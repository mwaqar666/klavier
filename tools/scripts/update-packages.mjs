import devkit from "@nrwl/devkit";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import chalk from "chalk";

let [, , type = "patch"] = process.argv;
const projectGraph = await devkit.createProjectGraphAsync();

for (const [projectName, projectNode] of Object.entries(projectGraph.nodes)) {
	const projectPackageJsonPath = resolve(projectNode.data.root, "package.json");

	const packageJson = JSON.parse(readFileSync(projectPackageJsonPath).toString());
	let [major, minor, patch] = packageJson.version.split(".").map((versionNumber) => +versionNumber);

	switch (type) {
		case "major":
			major++;
			minor = 0;
			patch = 0;
			break;

		case "minor":
			minor++;
			patch = 0;
			break;

		case "patch":
		default:
			patch++;
			break;
	}

	try {
		packageJson.version = `${ major }.${ minor }.${ patch }`;
		writeFileSync(projectPackageJsonPath, JSON.stringify(packageJson, null, 2));

		console.log(chalk.bold.blue(`Success: ${ projectName } upgraded to v${ packageJson.version }`));
	} catch (error) {
		console.error(chalk.bold.red(`Failed: ${ projectName } failed to upgrade to v${ packageJson.version }`));
	}

}

process.exit(0);
