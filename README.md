# SVG-TO-JSX

<p align="center">
  <img src="./banner.png"/>
</p>

<p align="center">
  <i><b>Convert SVGs to Dynamic TSX React Components</b></i>
</p>

- ✅ JSX props (`stroke-width` to `strokeWidth`, `stroke-linecap` to `strokeLinecap`, etc.)
- ✅ Dynamic attributes (`size`, `color`, `stroke`, `strokeWidth`, etc.)
- ✅ Added standard props (`className`, `style`, etc.)
- ✅ Icon map
- ✅ Prettier formatting

> **_NOTE:_**  [svgr](https://react-svgr.com/) is a great alternative to this tool, and it's more flexible. I built this tool because I needed a more opinionated tool that would generate the icons in a specific way.

## Designing a Uniform Iconset

To begin, we need a uniform, professional iconset. Here are some considerations when designing your icons;

- Consistent frame (`32px`, `2px` padding)
- Consistent icon size (you'll likely have horizontal and vertical icons, stick with `28x20` and `20x28`)
- Consistent style, use simple shapes
- Test the icons at different scales and use grids

Since those icons are meant to be used in software products, we'll also need a way to catalog them so they are easily searched and used, see `Icon.map.ts`.

## Getting Started

Get started by cloning the repository and running the `init` command which will created the required `input` and `output` folders as well as setup a default `svgtojsx.config.js` file (view [Configurations](#configurations) for more information).

```shell
git clone git@github.com:DominicF96/svg-to-jsx.git
cd svg-to-jsx
npm install
npm run init
```

Once your project is initialized, you can start adding your SVGs to the `input` folder. Your icon SVGs should be named as such; `snake_case_component_name-icon_category.svg`.

> **_NOTE:_** If the provided `category` is not found in the config file, the icon will be placed in the `misc` category, regardless of the provided category.

Then, run the `start` command to generate the dynamic JSX React components.

```shell
npm run start
```

This will start the conversion of your SVGs into dynamic JSX React components. The generated components will be placed in the `output` folder.

The tool also generates an `Icon.map.ts` file which contains a map of all the generated components and their categories. This file is used as a dictionary of icons, to facilitate showing the icons in Storybook or any other alternative.

The resulting icons can be used in combination with the provided `component/Icon` component, which is a wrapper around the generated icons.

### Unsupported Attributes

Some attributes are yet to be supported with SVGtoJSX, having SVGs with those attributes will cause warnings and need manual fixes.

- SVGtoJSX is meant to work with outline icons, not filled ones. The SVGs shouldn't use `fill` but `stroke` and `strokeWidth` instead
- SVG shouldn't use `style`, but if it's required, the JSX will have to be adjusted manually

## Configurations

You can configure SVGtoJSX a `svgtojsx.config.js` file in the root of the project to configure a few parameters;

```js
// svgtojsx.config.js
module.export = {
  input: './input', // The folder where the SVGs are located
  output: './output', // The folder where the JSX components will be generated
  svg: {
    viewBox: '0 0 32 32', // Enforce a viewBox for all the SVGs
  },
  jsx: {
    // JSX options
    fileCase: 'pascal', // The case of the generated file name (only supports pascal)
    typescript: {
      enabled: true, // Whether to generate TSX or JSX (JSX is not currently supported)
    },
    prettier: {
      enabled: true, // Whether to format the generated JSX
      config: "./", // The path to the prettier config file
    },
    defaultProps: {
      size: 32, // Default size
      color: '#000', // Default color
      strokeWidth: 2, // Default strokeWidth
      className: '', // Default className
    },
    restProps: true, // Whether to add the {...rest} props to the JSX element
  },
};
```

## Contributions

Contributions are welcome! Please open an issue or submit a pull request.
