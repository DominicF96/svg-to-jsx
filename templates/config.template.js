module.exports = {
  input: 'input', // The folder where the SVGs are located
  output: 'output', // The folder where the JSX components will be generated
  svg: {
    viewBox: '0 0 32 32', // Enforce a viewBox for all the SVGs
  },
  jsx: {
    // JSX options
    fileCase: 'pascal', // The case of the generated file name (only supports pascal)
    typescript: {
      enabled: true, // Whether to generate TSX or JSX
      config: "./", // The path to the tsconfig file
    
    },
    prettier: {
      enabled: true, // Whether to format the generated JSX
      config: "./", // The path to the prettier config file
    },
    defaultProps: {
      size: 32, // Default size
      stroke: '#000', // Default stroke
      strokeWidth: 2, // Default strokeWidth
      className: '', // Default className
    },
    restProps: true, // Whether to add the {...rest} props to the JSX element
  },
};