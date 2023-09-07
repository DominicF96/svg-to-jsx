module.exports = {
  snakeToPascal: (str) => {
    return str.replace(/(\_\w)/g, function(m) { return m[1].toUpperCase(); }).replace(/^\w/, c => c.toUpperCase());
  }
}