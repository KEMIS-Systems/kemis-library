const fs = require("fs");
const path = require("path");

const sourcePathPackagejson = path.join(__dirname, "package.json");
const destPathPackagejson = path.join(__dirname, "/build", "package.json");

const sourcePathViteConfig = path.join(__dirname, "vite.config.js");
const destPathViteConfig = path.join(__dirname, "/build", "web/vite.config.js");

const sourceNpm = path.join(__dirname, ".npmignore");
const destPathNpm = path.join(__dirname, "/build", ".npmignore");

const sourcePathBabel = path.join(__dirname, ".babelrc");
const destPathBabel = path.join(__dirname, "/build", ".babelrc");

fs.copyFileSync(sourcePathPackagejson, destPathPackagejson);
fs.copyFileSync(sourceNpm, destPathNpm);
// fs.copyFileSync(sourcePathBabel, destPathBabel);
``;
