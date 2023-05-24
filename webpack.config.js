const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const envs = require("./environment-vars.json");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  // eslint-disable-next-line no-console
  const orgName = "plateforme-sifast";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // needed for running all locally
    devServer: {
      allowedHosts: "all",
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      client: {
        webSocketURL: "ws://0.0.0.0:9090/ws",
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        favicon: "src/favicon.ico",
        inject: false,
        template: "src/index.ejs",
        minify: false,
        templateParameters: {
          env: getEnvVariables(webpackConfigEnv.env),
          orgName,
        },
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          { from: "src/pages", to: "pages" },
          { from: "src/styles", to: "styles" },
        ],
      }),
    ],
  });
};

function getEnvVariables(env) {
  return envs[env];
}
