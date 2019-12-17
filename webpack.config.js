const webpack = require("webpack");

module.exports = {
    mode: "development",
    // Enable sourcemaps for debugging webpack's output.
    //devtool: "source-map",
    entry: {
        "index": "./src/index.tsx"
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/dist"
    },    

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            
            { test: /\.worker\.ts$/, use:[
                {
                    loader: require.resolve('worker-loader'),
                    options: {
                        name: '[name].js',
                        publicPath: "dist/"
                    },
                }
            ] },
            
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            
        ],
        /*loaders: [{
            query: { presets: ['es2015'] }
        }]*/
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};