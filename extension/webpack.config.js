const nodeExternals = require("webpack-node-externals");
const path = require("path");
const {writeFile, readFile} = require("node:fs");

class CustomAfterBuildPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('CustomAfterBuildPlugin', (stats) => {
            console.log('Build is done!');
            const filePath = 'dist/bundle.js';
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`);
                    return;
                }
                const lines = data.split('/*! For license information please see bundle.js.LICENSE.txt */\n');
                lines.shift();
                const updatedContent = `javascript:${lines.join('')}`;
                // const updatedContent = `{lines.join('')}`;
                writeFile(filePath, updatedContent, (err) => {
                    if (err) {
                        console.error(`Error writing file: ${err}`);
                        return;
                    }
                    console.log('Custom task completed successfully!');
                });
            });
        });
    }
}



module.exports = {
    entry: "./app.js",
    mode: "production",
    target: "web",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        libraryTarget: "commonjs2",
    },
    // externals: [nodeExternals()],
    stats: {
        all: undefined,
        moduleAssets: false,
        dependentModules: false,
        excludeModules: false,
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src/")
        },
        extensions: ['.js', '.jsx'],  // Add .jsx to extensions
    },
    plugins: [
        new CustomAfterBuildPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs|jsx)$/,  // Add jsx to the test regex
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],  // Add @babel/preset-react
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // Injects styles into DOM
                    'css-loader',   // Turns css into commonjs
                    'sass-loader',  // Compiles Sass to CSS
                ],
            }
        ]
    },
};
