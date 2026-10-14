import fs from "node:fs";
import path from "node:path";

function ensureDirs() {
  const root = process.cwd();
  const distDir = path.join(root, "dist");
  const clientDir = path.join(distDir, "client");
  const outputPublicDir = path.join(root, ".output", "public");
  const vercelStaticDir = path.join(root, ".vercel", "output", "static");

  // Determine source of client assets
  let sourceDir = null;
  if (fs.existsSync(vercelStaticDir) && fs.readdirSync(vercelStaticDir).length > 0) {
    sourceDir = vercelStaticDir;
  } else if (fs.existsSync(outputPublicDir) && fs.readdirSync(outputPublicDir).length > 0) {
    sourceDir = outputPublicDir;
  } else if (fs.existsSync(distDir) && fs.readdirSync(distDir).length > 0) {
    sourceDir = distDir;
  }

  // Ensure dist and dist/client directories always exist
  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(clientDir, { recursive: true });

  if (sourceDir && sourceDir !== distDir) {
    fs.cpSync(sourceDir, distDir, { recursive: true });
    fs.cpSync(sourceDir, clientDir, { recursive: true });
    console.log(
      `Successfully populated dist and dist/client from ${path.relative(root, sourceDir)}.`,
    );
  } else if (sourceDir === distDir) {
    const entries = fs.readdirSync(distDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "client") continue;
      const srcPath = path.join(distDir, entry.name);
      const destPath = path.join(clientDir, entry.name);
      fs.cpSync(srcPath, destPath, { recursive: true });
    }
    console.log("Successfully prepared dist and dist/client for deployment.");
  } else {
    console.log("Created fallback dist and dist/client directories.");
  }

  // Ensure public directory assets (favicons, robots.txt, etc.) are synchronized to all target directories
  const publicDir = path.join(root, "public");
  if (fs.existsSync(publicDir)) {
    fs.cpSync(publicDir, distDir, { recursive: true });
    fs.cpSync(publicDir, clientDir, { recursive: true });
    if (fs.existsSync(outputPublicDir)) {
      fs.cpSync(publicDir, outputPublicDir, { recursive: true });
    }
    if (fs.existsSync(vercelStaticDir)) {
      fs.cpSync(publicDir, vercelStaticDir, { recursive: true });
    }
  }
}

ensureDirs();
