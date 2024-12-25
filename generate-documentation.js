const path = require('path');
const fse = require('fs-extra');
const {File} = require('nodejs-shared');
const hbs = require('express-hbs-compile');

/**
 * Generates a regular expression to replace page links in the templates.
 * @param {string[]} templates An array of template (.hbs) file paths.
 * @return {RegExp} The regular expression for replacing page links.
 */
function generatePageLinkReplacementRegexp(templates) {
  // Get the base names of the templates and escape RegExp special characters.
  const basenames = templates.map(template =>
    File.basename(template).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  );

  // Create a RegExp to match href="/page" and href="/page#section"
  return new RegExp(`href="/(${basenames.join('|')})(#[A-Za-z]+[\\w\\-\\:\\.]*)?"`, 'g');
}

/**
 * Replaces page links in the given content.
 * For example:
 * - href="/page" to href="/page.html"
 * - href="/page#section" to href="/page.html#section"
 * @param {string} content The template content.
 * @param {RegExp} regex The regular expression to replace page links.
 * @return {string} The content with replaced page links.
 */
function replacePageLinks(content, regex) {
  return content.replace(regex, (match, capture) => {
    return match.replace('/' + capture, capture + '.html');
  });
}

/**
 * Copies asset files from the demo directory to the docs directory.
 * @param {string} [version] Optional version string to include in the destination path.
 */
function copyAssetFiles(version = undefined) {
  const subdirectories = ['build', 'img', 'json'];

  for (let subdir of subdirectories) {
    const src = path.join(__dirname, `demo/public/${subdir}`);
    const dest = version
      ? path.join(__dirname, `docs/${version}/${subdir}`)
      : path.join(__dirname, `docs/${subdir}`);

    fse.copySync(src, dest);
    console.log(`Write ${dest}`);
  }
}

// Find all .hbs files in the demo/views directory.
const templates = File.find(path.join(__dirname, 'demo/views/*.hbs'));

// Generate the RegExp for replacing page links.
const pageLinkRegex = generatePageLinkReplacementRegexp(templates);

// Configure the Handlebars compiler.
const render = hbs({
  viewsDir: path.join(__dirname, 'demo/views'),
  partialsDir: path.join(__dirname, 'demo/views/partials'),
  layoutsDir: path.join(__dirname, 'demo/views/layout'),
  defaultLayout: path.join(__dirname, 'demo/views/layout/default.hbs'),
  extname: '.hbs',
});

(async () => {
  const version = undefined; // Set to a version string if needed (e.g., 'v3')
  let i = 0;
  
  // Compile and process each template.
  for (let template of templates) {
    // Compile the template.
    let content = await render(template, {
      currentPath: `/${File.basename(template)}`,
    });

    // Replace page links in the compiled content.
    content = replacePageLinks(content, pageLinkRegex);

    // Determine the output HTML file path.
    const htmlPath = version
      ? path.join(__dirname, `docs/${version}/${File.basename(template)}.html`)
      : path.join(__dirname, `docs/${File.basename(template)}.html`);

    // Write the compiled HTML to the output file
    File.write(htmlPath, content);
    console.log(`Write ${htmlPath} (${++i}/${templates.length})`);
  }

  // Copy asset files to the docs directory.
  copyAssetFiles(version);
})();