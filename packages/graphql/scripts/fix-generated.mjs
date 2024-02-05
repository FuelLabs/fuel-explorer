import { promises as fs } from "node:fs";
import path from "node:path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const TYPES_FILE = path.resolve(__dirname, "../src/generated/types.ts");
const MOCKS_FILE = path.resolve(__dirname, "../src/generated/mocks.ts");

async function types() {
	let file = await fs.readFile(TYPES_FILE, "utf-8");
	file = file.replace("returnType: ReturnType", "returnType: _ReturnType");
	file = file.replace("export enum ReturnType {", "export enum _ReturnType {");
	await fs.writeFile(TYPES_FILE, file, "utf-8");
}

async function mocks() {
	let file = await fs.readFile(MOCKS_FILE, "utf-8");
	file = file.replace(", ReturnType, ", ", _ReturnType as ReturnType, ");
	await fs.writeFile(MOCKS_FILE, file, "utf-8");
}

async function main() {
	await types();
	await mocks();
}

main();
