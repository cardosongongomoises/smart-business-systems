import { execSync } from "node:child_process";

process.env["NODE_ENV"] = "production";

try {
  execSync("npx vite build", {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });
  await import("./postbuild.js");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
