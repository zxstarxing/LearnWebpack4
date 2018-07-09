const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        "./js/app.bundle": './src/app.js',
        './js/contact': './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devServer: {
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        "sass-loader",
                    ]
                }),
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader',
                })
            },
            {
                test: [/\.js$/, /\.jsx$/],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: './images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: true,
                  }
                }],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'LearnWebpack4',
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
            chunks: ["./js/app.bundle"]
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            hash: true,
            chunks: ["./js/contact"]
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('./css/[name].[chunkhash].css').replace('css/js', 'css').replace('./js/', '');
            },
            allChunks: true
        }),
        new CleanWebpackPlugin('dist'),
    ]
};