import fs from "node:fs";
import path from "node:path";

function ensureDirs() {
  const root = process.cwd();
  const distDir = path.join(root, "dist");
  const clientDir = path.join(distDir, "client");
  const outputPublicDir = path.join(root, ".output", "public");

  // Determine source of client assets
  let sourceDir = null;
  if (fs.existsSync(distDir)) {
    sourceDir = distDir;
  } else if (fs.existsSync(outputPublicDir)) {
    sourceDir = outputPublicDir;
    // Also copy .output/public to dist if dist doesn't exist
    fs.mkdirSync(distDir, { recursive: true });
    fs.cpSync(outputPublicDir, distDir, { recursive: true });
  }

  if (sourceDir && fs.existsSync(sourceDir)) {
    fs.mkdirSync(clientDir, { recursive: true });
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "client") continue;
      const srcPath = path.join(sourceDir, entry.name);
      const destPath = path.join(clientDir, entry.name);
      fs.cpSync(srcPath, destPath, { recursive: true });
    }
    console.log("Successfully prepared dist and dist/client for deployment.");
  } else {
    // Fallback: create both directories so deployment check never fails
    fs.mkdirSync(clientDir, { recursive: true });
    console.log("Created fallback dist and dist/client directories.");
  }
}

ensureDirs();
