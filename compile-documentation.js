/**
 * Compile the templates in the demo/ directory and output them as HTML in the docs/ directory.
 */
const path = require('path');
const fse = require('fs-extra');
const {File} = require('nodejs-shared');
const hbs = require('express-hbs-compile');

// Generate page link replacement RegExp.
function generatePageLinkReplacementRegexp(templates) {
  // A regular expression that replaces page links in the template.
  const basenames = templates.map(template => {
    // Get the base name of the template.
    const basename = File.basename(template);

    // Escapes regular expression characters in base names.
    return basename.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  });
  return new RegExp(`href="/(${basenames.join('|')})"`, 'g');
}

// Replace page links.
function replacePageLinks(content, re) {
  return content.replace(re, (match, capture) => {
    return match.replace(capture, capture + '.html');
  });
}

// Copy asset files.
function copyAssetFiles() {
  for (let subdirectory of ['build', 'img', 'json']) {
    const src = path.join(__dirname, `demo/public/${subdirectory}`);
    const dest = path.join(__dirname, `docs/${subdirectory}`);
    fse.copySync(src, dest);
    console.log(`Write ${dest}`);
  }
}

// Find the hbs file.
const templates = File.find(path.join(__dirname, 'demo/views/*.hbs'));

// Generate page link replacement RegExp.
const re = generatePageLinkReplacementRegexp(templates);

// Generate compiler.
const render = hbs({
  viewsDir: path.join(__dirname, 'demo/views'),
  partialsDir: path.join(__dirname, 'demo/views/partials'),
  layoutsDir: path.join(__dirname, 'demo/views/layout'),
  defaultLayout: path.join(__dirname, 'demo/views/layout/default.hbs'),
  extname: '.hbs',
});

// If the docs/ directory does not exist, create it.
File.makeDirectory(path.join(__dirname, 'docs'));

(async () => {
  let i = 0;
  for (let template of templates) {
    // Compile template.
    let content = await render(template, {
      currentPath: `/${File.basename(template)}`,
    });


    // Add HTML extensions to the end of page links.
    content = replacePageLinks(content, re);

    // HTML file path.
    const html = path.join(__dirname, `docs/${File.basename(template)}.html`)

    // Write HTML file.
    File.write(html, content);
    console.log(`Write ${html} (${++i}/${templates.length})`);
  }

  // Copy asset files.
  copyAssetFiles();
})();

