import { readFileSync } from "fs";
import { join } from "path";

readFileSync(join(__dirname, "./schemas/extend.graphql"), "utf-8");
