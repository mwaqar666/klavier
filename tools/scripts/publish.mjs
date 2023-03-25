/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * This script is executed on "dist/path/to/library" as "cwd" by default.
 *
 * You might need to authenticate with NPM before running this script.
 */

import devkit from "@nrwl/devkit";
import { readFileSync } from "fs";
import chalk from "chalk";

const undefinedArg = "undefined";

const failIf = (condition, message) => {
	if (!condition) return;

	console.error(chalk.bold.red(message));
	process.exit(1);
};

// Executing publish script: node path/to/publish.mjs {name} --tag {tag} --otp {otp}
let [, , name, tag, otp] = process.argv;
failIf(!otp || otp === undefinedArg || otp.length !== 6, "OTP is required for publishing. Please provide a six digit OTP");

// Default "tag" to "next" so we won't publish the "latest" tag by accident.
tag = !tag || tag === undefinedArg ? "next" : tag;

const graph = devkit.readCachedProjectGraph();
const project = graph.nodes[name];
failIf(!project, `Could not find project "${ name }" in the workspace. Is the project.json configured correctly?`);

const outputPath = project.data?.targets?.build?.options?.outputPath;
failIf(!outputPath, `Could not find "build.options.outputPath" of project "${ name }". Is project.json configured  correctly?`);

process.chdir(outputPath);
console.info(chalk.bold.blue(`Directory changed: ${ outputPath }`));

try {
	const json = JSON.parse(readFileSync("package.json").toString());
	const packageVersion = json.version;

	const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
	failIf(!packageVersion || !validVersion.test(packageVersion), `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${ packageVersion }.`);

	console.info(chalk.bold.blue(`Publishing version: ${ packageVersion }`));
} catch (e) {
	console.error(chalk.bold.red("Error reading package.json file from library build output."));
}

const publishCommand = `npm publish --access public --tag=${ tag } --otp=${ otp }`;
console.info(chalk.bold.blue(`Running publish command: ${ publishCommand }`));

// execSync(publishCommand);
