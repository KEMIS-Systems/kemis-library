const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "package.json");
const destPath = path.join(__dirname, "..", "package.json");

fs.copyFileSync(sourcePath, destPath);
``;
