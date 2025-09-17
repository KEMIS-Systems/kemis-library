const fs = require("fs");
const path = require("path");

function copyFolderSync(from, to) {
  fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach((element) => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isFile()) {
      fs.copyFileSync(fromPath, toPath);
    } else {
      copyFolderSync(fromPath, toPath);
    }
  });
}

// Copia a pasta de fontes
const srcFonts = path.resolve(__dirname, "src/styles/fonts");
const destFonts = path.resolve(__dirname, "build/styles/fonts");

const sourcePathPackagejson = path.join(__dirname, "package.json");
const destPathPackagejson = path.join(__dirname, "/build", "package.json");

const sourceNpm = path.join(__dirname, ".npmignore");
const destPathNpm = path.join(__dirname, "/build", ".npmignore");

const sourcePathViteConfig = path.join(__dirname, "vite.config.js");
const destPathViteConfig = path.join(__dirname, "/build", "web/vite.config.js");
const sourcePathBabel = path.join(__dirname, ".babelrc");
const destPathBabel = path.join(__dirname, "/build", ".babelrc");

if (fs.existsSync(srcFonts)) {
  copyFolderSync(srcFonts, destFonts);
}

// if (fs.existsSync(sourcePathPackagejson)) {
//   copyFolderSync(sourcePathPackagejson, destPathPackagejson);
// }

// if (fs.existsSync(sourceNpm)) {
//   copyFolderSync(sourceNpm, destPathNpm);
// }

fs.copyFileSync(sourcePathPackagejson, destPathPackagejson);
fs.copyFileSync(sourceNpm, destPathNpm);
// fs.copyFileSync(sourcePathBabel, destPathBabel);
``;
