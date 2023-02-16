/**
 * This is a script that re-creates the docs based on the demo.
 */
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function copyHtml() {
  const views = fs.readdirSync(`${demoDir}/views`, {withFileTypes: true})
    .filter(dirent => dirent.isFile())
    .map(({name}) => name)
    .filter(file => path.extname(file).toLowerCase() === '.hbs');
  for (let view of views)
    fs.copyFileSync(`${demoDir}/views/${view}`, `${docDir}/${view}`.replace('.hbs', '.html'));
}

function copyBuild() {
  fse.copySync(`${demoDir}/public/build`, `${docDir}/build`);
}

function replaceIndexlinks() {
  const indexHtml = `${docDir}/index.html`;
  let content = fs.readFileSync(indexHtml, 'utf8');
  content = content.replace(/<a\s+(href="[a-z\-]+")..*?class="preview-thumbnail..*?">/g, match => {
    return match.replace(/href="([a-z\-]+)"/, 'href="$1.html"');
  });
  fs.writeFileSync(indexHtml, content, 'utf8');
}

const docDir = path.dirname(__filename);
const rootDir = path.resolve(docDir, '..').replace(/[\/\\]$/, '');
const demoDir = `${rootDir}/demo`;
copyHtml();
// copyBuild();
replaceIndexlinks();