const Dotenv = require("dotenv-webpack");
module.exports = {
  configureWebpack: {
    plugins: [new Dotenv("./.env")],
    resolve: {
      symlinks: false,
      alias: {
        vue$: "vue/dist/vue.runtime.esm.js",
      },
    },
  },
};
