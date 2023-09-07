const fs = require("fs");
const colors = require('colors');

console.log("╭╭==============================================================================╮╮");
console.log("||                                                                              ||");

console.log(`|| `, `Initializing SVGtoJSX...`.bold, "                                                   ||");
console.log("||                                                                              ||");

// Check for SVGtoJSX.config.js file.
let configs;
if (!fs.existsSync('./svgtojsx.config.js')) {
  console.log("||  --------------------------------------------------------------------------  ||");
  console.log(`|| `, `No svgtojsx.config.js file found, creating one for you...`.yellow, "                  ||");
  configs = require('./templates/config.template');
  try {
    fs.copyFileSync('./templates/config.template.js', './svgtojsx.config.js');
    console.log('|| ', 'Default svgtojsx.config.js file created. Feel free to update it as needed.'.yellow, " ||");
  } catch (err) {
    throw err;
  }
} else {
  configs = require('./svgtojsx.config');
}
if (!fs.existsSync(configs.input) || !fs.existsSync(configs.output)) {
  console.log("||  --------------------------------------------------------------------------  ||");
}
// Check for input and output directories.
if (!fs.existsSync(configs.input)) {
  console.log(`||  'input' directory created.`, "                                                 ||");
  fs.mkdirSync(configs.input);
}
if (!fs.existsSync(configs.output)) {
  console.log(`||  'output' directory created.`, "                                                ||");
  fs.mkdirSync(configs.output);
}
console.log("||  --------------------------------------------------------------------------  ||");
console.log("||                                                                              ||");
console.log(`|| `, `SVGtoJSX initialized successfully!`.green.bold, "                                         ||");
console.log("||                                                                              ||");
console.log("╰╰==============================================================================╯╯");