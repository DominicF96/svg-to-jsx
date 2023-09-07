const fs = require("fs");
const prettier = require("prettier");
const colors = require('colors');

const generateIcon = require(`./templates/icon.template`);
const { snakeToPascal } = require("./util/string.util");

const version = "1.0.0";
const date = new Date();

// Load config file.
let config;
if (!fs.existsSync('./svgtojsx.config.js')) {
  console.log(`SVGtoJSX was not initialized, please run 'npm run init' to correct the situation.`.red);
  return;
} else {
  config = require('./svgtojsx.config');
}

// Check Requirements.
if (!fs.existsSync(config.input) || !fs.existsSync(config.output)) {
  console.log(`SVGtoJSX was not initialized, please run 'npm run init' to correct the situation.`.red);
  return;
}

// Load SVG files from input directory.
const files = fs.readdirSync(config.input);
if (!files.length) {
  console.log('No files to generate.'.yellow);
  return;
}

// Initialize Icon status arrays.
let failedIcons = [];
let warnings = {};
let generatedIcons = [];

console.log("╭╭=========================================================================╮╮");
console.log("||                                                                         ||");
console.log(`||                          `, `Running SVGtoJSX...`.bold, "                          ||");
console.log("||                                                                         ||");
console.log("╰╰=========================================================================╯╯\n");
// Generate React components from SVG files.
Promise.all(files.map((fileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Extract SVG metadata from file name.
      const id = fileName.split('-')[0];
      const category = fileName.split('-')[1].split(".")[0];
      if (!id || !category) {
        console.log(`Invalid file name: ${fileName}, please see README.md file.`.red);
        return;
      } else {
        console.log('Generating icon: ', fileName.green.bold, '...');
      }

      // Read SVG file.
      let svg = fs.readFileSync(`${config.input}/${fileName}`, 'utf8');

      // Replace SVG attributes with React dynamic and JSX props.
      svg = svg.replace(/width=("\d+")/g, `width={size || width}`);
      svg = svg.replace(/height=("\d+")/g, `height={size || height}`);
      svg = svg.replace(/stroke=("(.*?)")/g, "stroke={color}");
      svg = svg.replace(/stroke-width=("(.*?)")/g, "strokeWidth={strokeWidth}");
      svg = svg.replace(/clip-rule/g, "clipRule");
      svg = svg.replace(/fill-rule/g, "fillRule");
      svg = svg.replace(/stroke-linecap/g, "strokeLinecap");
      svg = svg.replace(/stroke-linejoin/g, "strokeLinejoin");
      svg = svg.replace(/stroke-miterlimit/g, "strokeMiterlimit");
      svg = svg.replace(/fill="none"/g, "");

      // Flag any problematic SVGs that need manual fixes.
      const invalidAttribute = (attribute) => `The '${fileName}' SVG uses an unsupported attribute '${attribute}', please update the icon or fix it manually.`;
      if (!svg.includes(`viewBox="${config.svg.viewBox}"`)) {
        warnings[fileName] = true;
        console.log(invalidAttribute("viewBox").yellow);
      }
      if (svg.includes('style=')) {
        warnings[fileName] = true;
        console.log(invalidAttribute("style").yellow);
      }
      if (svg.includes('fill=')) {
        warnings[fileName] = true;
        console.log(invalidAttribute("fill").yellow);
      }

      // Add React {...rest} prop to SVG root.
      if (config.jsx.restProps) {
        let svgTagMatch = /<svg(.*?)>/.exec(svg);
        let svgArr = svg.split('');
        let svgTagMatchEndIndex = svgTagMatch.index + svgTagMatch[0].length;
        svgArr.splice(svgTagMatchEndIndex - 1, 0, ` {...rest}`);
        svg = svgArr.join('');
      }

      // Format SVG with Prettier.
      let formattedSvg;
      if (config.jsx.prettier.enabled) {
        formattedSvg = await prettier.format(svg, { semi: false, parser: "babel" });
      }

      // Generate React component content.
      const componentName = snakeToPascal(id);
      const componentContent = generateIcon(version, date, componentName, config.jsx.prettier.enabled ? formattedSvg.slice(1) : svg, config);

      // Write React component to file.
      if (!fs.existsSync(config.output)) {
        fs.mkdirSync(config.output);
      }
      const componentFilename = `${snakeToPascal(id)}.tsx`;
      if (!fs.existsSync(`${config.output}/icons`)) {
        fs.mkdirSync(`${config.output}/icons`);
      }
      fs.writeFileSync(`${config.output}/icons/${componentFilename}`, componentContent);

      // Add icon to generated icons array for future Icon.map.ts (index) file generation.
      generatedIcons.push({
        id,
        componentName,
        category,
        file: componentFilename
      });
      resolve();
    } catch (err) {
      console.log(`Failed to generate icon: ${fileName}. ${err}`.red);
      failedIcons.push(fileName);
      resolve();
    }
  });
})).then(async () => {

  // Log results.
  console.log("\n╭╭=========================================================================╮╮");
  console.log("||                                                                         ||");
  console.log("|| ", "SVGtoJSX".green.bold, "                                                              ||");
  if (failedIcons.length <= 0) {
    console.log(`|| `, `Successfully generated ${generatedIcons.length}/${files.length} icons.`.green.bold, "                                   ||");
  }
  if (Object.keys(warnings).length > 0) {
    console.log(`|| `, `Some icons (${Object.keys(warnings).length}/${files.length}) need manual fixes:`.yellow.bold, "                                  ||");
    console.log(`|| `, `Please check the logs above for more information.`.yellow.bold, "                     ||");
  }
  if (failedIcons.length > 0) {
    console.log(`|| Some icons failed to generate: ${failedIcons.join(', ')}. Please check the logs above for more information.`.red);
  }

  // Generate Icon.map.ts (index) file.
  console.log("||  -----------------------------------------------------------------------||");
  console.log(`|| `, `Generating Icon.map.ts ...`, "                                            ||");
  const generateIconMap = require(`./templates/iconmap.template`);
  const iconMapContent = generateIconMap(version, date, generatedIcons);

  // Write Icon.map.ts to file.
  fs.writeFileSync(`${config.output}/Icon.map.ts`, iconMapContent);
  console.log(`|| `, `Successfully generated Icon.map.ts for successfully generated icons.`.green.bold, "  ||");
  console.log("||                                                                         ||");
  console.log("╰╰=========================================================================╯╯");
});
