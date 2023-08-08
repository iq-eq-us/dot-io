const webpack = require('webpack');

module.exports = {
    webpack: {
        plugins: {
            add: [
                new webpack.ProvidePlugin({
                    process: 'process/browser.js',
                })
            ]
        },
        configure: {
            resolve: {
                fallback: {
                    'fs': false,
                    'path': false,
                    'crypto': false,
                }
            },
        },
    },
};