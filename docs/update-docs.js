/**
 * This is a script that re-creates the docs based on the demo.
 * The following process is performed
 * - Copy demo/views/*.hbs to docs/*.html.
 * - Copy demo/public/build to docs/build.ss
 * - Replace references to docs/index.html links with docs/*.html.
 */
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function copyHtml() {
  const srcFiles = fs.readdirSync(`${demoDir}/views`, {withFileTypes: true})
    .filter(dirent => dirent.isFile())
    .map(({name}) => name)
    .filter(file => path.extname(file).toLowerCase() === '.hbs');
  for (let srcFile of srcFiles) {
    const srcPath = `${demoDir}/views/${srcFile}`;
    const dstPath = `${docDir}/${srcFile}`.replace('.hbs', '.html');
    console.log(`Copy ${srcPath} to ${dstPath}`);
    fs.copyFileSync(srcPath, dstPath);
  }
}

function copyBuild() {
  const srcPath = `${demoDir}/public/build`;
  const dstPath = `${docDir}/build`;
  console.log(`Copy ${srcPath} to ${dstPath}`);
  fse.copySync(srcPath, dstPath);
}

function replaceIndexlinks() {
  const indexHtml = `${docDir}/index.html`;
  let content = fs.readFileSync(indexHtml, 'utf8');
  content = content.replace(/<a\s+(href="[a-z\-]+")..*?class="preview-thumbnail..*?">/g, match => {
    return match.replace(/href="([a-z\-]+)"/, 'href="$1.html"');
  });
  console.log(`Replace links in ${indexHtml}`);
  fs.writeFileSync(indexHtml, content, 'utf8');
}

const docDir = path.dirname(__filename);
const rootDir = path.resolve(docDir, '..').replace(/[\/\\]$/, '');
const demoDir = `${rootDir}/demo`;
copyHtml();
copyBuild();
replaceIndexlinks();