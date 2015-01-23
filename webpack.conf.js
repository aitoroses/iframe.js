var path = require('path');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, "index.js"),
  output: {
    path: __dirname,
    filename: "iframe-utils.js"
  }
}
