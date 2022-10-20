const {defineConfig} = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/swapi_vuex/" : "/",
    transpileDependencies: true,
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()],
        resolve: {
            fallback: {
                fs: false,
            },
        },
    },
    pages: {
        index: "src/main.ts",
        other_page: "src/main.ts",
    },
});
