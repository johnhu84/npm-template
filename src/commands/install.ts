import fs from "fs";
import { Dependency } from "../types";
import { installPackages } from "../util/download";
import { nodeModulesPath, outputDir, packageJsonPath } from "../util/paths";

export async function installAllDependencies() {
  console.log("Installing dependencies...");

  // Delete the node_modules folder if it exists - we always install from scratch
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true });
  }
  fs.mkdirSync(nodeModulesPath);

  // Get top-level dependencies from package.json
  const topLevelDependencies = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf8")
  ).dependencies;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  // -------------------------------------------------
  // TODO -> Determine the full list of dependencies to download
  const cMap = Object.entries(packageJson.dependencies).map(([key, value]) => {
    return {name: key, version: value} as Dependency
  });
  const dependenciesToDownload: Dependency[] = cMap
  // -------------------------------------------------

  await installPackages(dependenciesToDownload);
}
