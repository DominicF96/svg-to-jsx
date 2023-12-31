module.exports = (version, date, icons) => `// Generated by util/generate-iconmap.js v.${version}
// on ${date}
import { IconMap, iconCategories } from "./Icon.types";
${icons.map((icon) => {
  return `import ${icon.componentName} from "./icons/${icon.componentName}";`
}).join("\n")}

const icons: IconMap = {
  ${icons.map((icon) => `${icon.id}: {
    component: ${icon.componentName},
    category: iconCategories.${icon.category} as keyof typeof iconCategories,
  },`).join("\n")}
};

export default icons;
`