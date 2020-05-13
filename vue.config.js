const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// @  就代表src 所以也可以这么写 .set('views', resolve('@/views'))
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("views", resolve("src/views"))
      .set("assets", resolve("src/assets"))
      .set("public", resolve("public"))
      .set("components", resolve("src/components"));
  },
  "css": {}
};

